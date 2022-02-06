const functions = require("firebase-functions");
// const express = require("express");
// const cors = require("cors");
const stripe = require("stripe")("sk_test_51I2KRqFfwhAfciU4uIyF7grtXAZQfBBYAQ4n5uwqQNEvnoGi5AmpBEXssSxUKPrWAKQgChA2BHNacD4oIHXBJ45400wg7uhzlx");

// API

// - App config
// const app = express();

// - Middlewares
// app.use(cors());
// app.use(express.json());

// - API routes
// app.get("/", (request, response) => response.status(200).send("hello you"));

export default async function handler(req, res) {
  if (req.method === "POST") {
    const total = req.query.total;

    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });

    // OK - Created
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(200).json({ name: "welcome to this api point" + req.method });
  }
}

// - Listen command
// exports.api = functions.https.onRequest(app);
