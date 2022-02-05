import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../components/StateProvider";
import { getBasketTotal } from "../helpers/reducer";
import { useRouter } from "next/router";

function Subtotal() {
  const router = useRouter();
  const [{ basket }, dispatch] = useStateValue();

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

      <button onClick={() => router.push("/payment")}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
