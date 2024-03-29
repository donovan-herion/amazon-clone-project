import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "../components/CheckoutProduct";
import { useStateValue } from "../components/StateProvider";
import { getBasketTotal } from "../helpers/reducer";
import axios from "../helpers/axios";
// import axios from "axios";
import { db } from "../helpers/firebase";
import { uuid } from "uuidv4";

function payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  const [clientSecretDiscoverd, setClientSecretDiscovered] = useState(false);
  const [copiedCardNumber, setCopiedCardNumber] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(true);

  useEffect(() => {
    if (!clientSecretDiscoverd && basket.length) {
      // generate the special stripe secret which allows us to charge a customer
      console.log(`/payments/create?total=${Math.floor(getBasketTotal(basket) * 100)}`);
      const getClientSecret = async () => {
        const response = await axios({
          method: "post",
          // Stripe expects the total in a currencies subunits
          url: `/api/payments?total=${Math.floor(getBasketTotal(basket) * 100)}`,
        });
        setClientSecret(response.data.clientSecret);
        setClientSecretDiscovered(true);
      };

      getClientSecret();
    } else if (!basket.length && shouldRedirect) {
      router.push("/checkout");
    }
  }, [basket]);

  const handleSubmit = async event => {
    setShouldRedirect(false);

    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        db.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent.id).set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        router.replace("/orders");
      });
  };

  const handleChange = event => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleClick = () => {
    navigator.clipboard.writeText("42424242424242424242424");
    setCopiedCardNumber(true);
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (
          <Link href="/checkout">
            <span>{basket?.length} items</span>
          </Link>
          )
        </h1>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item, key) => (
              <CheckoutProduct key={uuid()} id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} hideButton />
            ))}
          </div>
        </div>

        {/* Payment section - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic will go */}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <p className="fake__card__number" onClick={() => handleClick()}>
                {!copiedCardNumber ? "CLICK TO COPY 42424242424242424242424 FAKE CARD NUMBER" : "CLICK TO COPY AGAIN"}
              </p>
              <div className="payment__priceContainer">
                <CurrencyFormat renderText={value => <h3>Order Total: {value}</h3>} decimalScale={2} value={getBasketTotal(basket)} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default payment;
