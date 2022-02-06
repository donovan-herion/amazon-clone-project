import "../styles/globals.css";
import "../styles/Header.css";
import "../styles/index.css";
import "../styles/Checkout.css";
import "../styles/CheckoutProduct.css";
import "../styles/Home.css";
import "../styles/Login.css";
import "../styles/Orders.css";
import "../styles/Payment.css";
import "../styles/Order.css";
import "../styles/Product.css";
import "../styles/Subtotal.css";

import { StateProvider } from "../components/StateProvider";
import reducer, { initialState } from "../helpers/reducer";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Amazon Clone Project</title>
        <meta name="description" content="Small amazon clone app coded with nextjs" />
      </Head>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Component {...pageProps} />
      </StateProvider>
    </>
  );
}

export default MyApp;
