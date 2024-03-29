import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { uuid } from "uuidv4";

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p className="order__date">{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map(item => (
        <CheckoutProduct key={uuid()} id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} hideButton />
      ))}
      <CurrencyFormat renderText={value => <h3 className="order__total">Order Total: {value}</h3>} decimalScale={2} value={order.data.amount / 100} displayType={"text"} thousandSeparator={true} prefix={"$"} />
    </div>
  );
}

export default Order;
