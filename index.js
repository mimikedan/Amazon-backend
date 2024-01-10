
// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({origin: true}));
app.use(express.json());
const stripe = require("stripe")("sk_test_51OO7tLEIuFq8O4hnYYenHVUvkgrXO82SiAyqKQ1yICPVMZSfswq3KB5Z3IvwJRGnTKUGA2xWNFxfxuPrdUMdrR7o00PPx8zjfk");
console.log(stripe);
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved for this amount >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // ok-created
  response.status(201).send({clientSecret: paymentIntent.client_secret});
});

// losten command
exports.api = functions.https.onRequest(app);
