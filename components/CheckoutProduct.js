import { useStateValue } from "../components/StateProvider";
import Image from "next/image";

function CheckoutProduct({ id, title, image, price, rating, hideButton }) {
  const [dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <>
      <div className="checkoutProduct__image-container">
        <Image className="checkoutProduct__image" src={image} layout="fill" />
      </div>
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map(() => {
              return <p>⭐</p>;
            })}
        </div>
        {!hideButton && <button onClick={removeFromBasket}>Remove from Basket</button>}
      </div>
    </>
  );
}

export default CheckoutProduct;
