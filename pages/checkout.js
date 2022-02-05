import CheckoutProduct from "../components/CheckoutProduct";
import { useStateValue } from "../components/StateProvider";
import Subtotal from "../components/Subtotal";
import { useTransition, animated } from "react-spring";
import { uuid } from "uuidv4";
import { useState, useEffect } from "react";
import Header from "../components/Header";

function checkout() {
  const [{ basket }, dispatch] = useStateValue();

  const [windowWidth, setWindowWidth] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const transition = useTransition(basket, product => product.id, {
    from: {
      height: 0,
      opacity: 0,
      marginLeft: -100,
      marginRight: 100,
    },
    enter: {
      height: windowWidth > 700 ? 200 : 230,
      opacity: 1,
      marginLeft: 0,
      marginRight: 0,
    },
    leave: {
      margin: 0,
      padding: 0,
      height: 0,
      overflow: "hidden",
      opacity: 0,
    },
    keys: basket.map((item, index) => index),
  });

  return (
    <>
      <Header />
      <div className="checkout">
        <div className="checkout__left">
          <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB4234926668_.jpg" />

          <div>
            <h2 className="checkout__title">Your Shopping Basket</h2>
            {console.log("transition", transition)}
            {transition.map(({ item, i, props }) => {
              return (
                <animated.div key={uuid()} style={props} className="checkoutProduct">
                  <CheckoutProduct key={uuid()} id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} />
                </animated.div>
              );
            })}
          </div>
        </div>

        <div className="checkout__right">
          <Subtotal />
        </div>
      </div>
    </>
  );
}

export default checkout;
