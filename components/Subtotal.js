import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../components/StateProvider";
import { getBasketTotal } from "../helpers/reducer";
import { useRouter } from "next/router";

function Subtotal() {
  const router = useRouter();
  const [{ basket, user }, dispatch] = useStateValue();

  const handleClick = () => {
    if (!user) {
      router.push("/login");
    } else if (basket.length) {
      router.push("/payment");
    } else {
      alert("You don't have any items in your basket yet");
    }
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={value => (
          <>
            <p>
              Subtotal ( {basket.length} items )<strong> {value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={handleClick}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
