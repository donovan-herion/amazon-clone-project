import { useState, useEffect } from "react";
import { db } from "../helpers/firebase";
import { useStateValue } from "../components/StateProvider";
import Order from "../components/Order";
import { uuid } from "uuidv4";
import Header from "../components/Header";

function orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot(snapshot =>
          setOrders(
            snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  if (user) {
    return (
      <>
        <Header />
        <div className="orders">
          <h1>Your Orders</h1>

          <div className="orders__order">
            {orders?.map(order => (
              <Order key={uuid()} order={order} />
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className="login__first">You are not logged in yet</div>;
      </>
    );
  }
}

export default orders;
