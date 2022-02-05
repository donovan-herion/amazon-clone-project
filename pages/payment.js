import Payment from "../components/Payment";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const promise = loadStripe("pk_test_51I2KRqFfwhAfciU4o1WVxeq5ZJjSQT81tZdAwxvIbYbpqTSql3oLz9igbQW9GaMLOOEMuTqKYkKyxKHFVM52qH0Q00zCdyEtur");

function payment() {
  return (
    <Elements stripe={promise}>
      <Payment />
    </Elements>
  );
}

export default payment;
