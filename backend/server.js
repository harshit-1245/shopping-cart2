const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const Razorpay = require('razorpay');


const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());


 const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Endpoint to create a Razorpay order
app.post('/api/create-razorpay-order', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    const options = {
      amount: amount * 100, // Razorpay accepts amount in smallest currency unit (e.g., paisa for INR)
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({ order }); // Sending the order details back to the client
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server live at ${port}`);
});
