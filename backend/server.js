const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const stripe = require('stripe')('sk_test_51O2qKzSG2lnNtXsEoZd8rcQOBmQuBdSWR6NNMpPbhS0rv4VlVJkhftu9LG28fCYRGxJeHMiZBCAb3m3KaW99q72300c2xEfgwU');

const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.status(200).json({ sessionId: session.id }); // Sending only the session ID back to the client
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server live at ${port}`);
});
