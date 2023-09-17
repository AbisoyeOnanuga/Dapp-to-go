// Require the dotenv package
require("dotenv").config();

// Import the spheron site sdk
const { SpheronClient, ProtocolEnum } = require("@spheron/site");

// Initialize the spheron site sdk with your token from the .env file
const client = new SpheronClient({ token: process.env.SPHERON_TOKEN });

// Initialize the spheron site sdk with your siteId and apiKey
spheron.init(process.env.SITE_ID, process.env.SPHERON_TOKEN);

'use strict';

/* navbar toggle */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelector("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay]

const navToggleEvent = function (elem) {
    for (let i= 0; i < elem.length; i++) {
        elem[i].addEventListener("click", function() {
            navbar.classList.toggle("active");
            overlay.classList.toggle("active");
        });
    }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);


/* header sticky */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

    if(window.scrollY >= 200) {
        header.classList.add("active");
    }   else {
        header.classList.remove("active");
    }

});

/*crypto payment*/
// Import axios library to make HTTP requests
const axios = require("axios");

// Define your API key from Coinbase Commerce dashboard
const API_KEY = "xxxxxxxxxxxxxxxxxxxxxxx";

// Define your webhook secret from Coinbase Commerce dashboard
const WEBHOOK_SECRET = "xxxxxxxxxxxxxxxxxxxxxxx";

// Define a function that will create a payment link for a given crypto currency and amount
const createPaymentLink = async (cryptoCurrency, amount) => {
  // Define the request headers with your API key
  const headers = {
    "X-CC-Api-Key": API_KEY,
    "X-CC-Version": "2018-03-22",
  };

  // Define the request data with the crypto currency, amount, and other optional parameters
  const data = {
    name: "Dapp To Go",
    description: "Your next flight",
    pricing_type: "fixed_price",
    local_price: {
      amount: amount,
      currency: "USD",
    },
    requested_info: ["name", "email"],
    metadata: {
      customer_id: 23,
      order_id: 123,
    },
  };

  // Define the request URL with the crypto currency
  const url = `https://api.commerce.coinbase.com/charges/${cryptoCurrency}`;

  // Make a POST request to the URL with the headers and data
  try {
    const response = await axios.post(url, data, { headers: headers });
    // Return the payment link from the response
    return response.data.data.hosted_url;
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
};

// Define a function that will verify a webhook event from Coinbase Commerce
const verifyWebhook = (req, res) => {
  // Get the raw body and signature from the request
  const rawBody = req.rawBody;
  const signature = req.headers["x-cc-webhook-signature"];

  // Create a crypto object to generate a hash
  const crypto = require("crypto");

  // Generate a hash with the raw body and webhook secret
  const hash = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  // Compare the hash with the signature
  if (hash === signature) {
    // The webhook is valid, process the event data
    const eventData = req.body.event.data;
    // Get the event type, charge code, and status from the event data
    const eventType = req.body.event.type;
    const chargeCode = eventData.code;
    const status = eventData.timeline[eventData.timeline.length - 1].status;
    // Log the event details
    console.log(`Event type: ${eventType}`);
    console.log(`Charge code: ${chargeCode}`);
    console.log(`Status: ${status}`);
    // Update your database or perform any other actions based on the event type and status
    // For example, if the status is COMPLETED, you can mark the order as paid and send a confirmation email to the customer
    // Send a 200 response to acknowledge the webhook
    res.status(200).send();
  } else {
    // The webhook is invalid, reject it
    res.status(400).send();
  }
};

// Define a function that will handle the click event of each crypto payment button
const handlePaymentClick = async (event) => {
  // Get the value of the clicked button, which is the crypto currency
  const cryptoCurrency = event.target.value;
  // Get the amount of the item from the item price span element
  const itemPrice = document.querySelector(".item-price").textContent;
  const amount = parseFloat(itemPrice);
  // Call the createPaymentLink function with the crypto currency and amount
  const paymentLink = await createPaymentLink(cryptoCurrency, amount);
  // Redirect the user to the payment link in a new tab or window
  window.open(paymentLink, "_blank");
};

// Add an event listener to each crypto payment button element
const cryptoPaymentButtons = document.querySelectorAll(
  ".crypto-payment-options button"
);
cryptoPaymentButtons.forEach((button) => {
  button.addEventListener("click", handlePaymentClick);
});
