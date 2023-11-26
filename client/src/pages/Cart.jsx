import React, { useContext } from 'react';
import { Context } from '../context/context';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
  const { cart, removeFromCart, calculateSubtotal, handleProductQuantity } = useContext(Context);
  const navigate = useNavigate();

  // Payment integration
  const makePayment = async () => {
    try {
      const stripe = await loadStripe('pk_test_51O2qKzSG2lnNtXsE9HCOr5NmFw1c8yXNU5S9qnwywTa2VxUKyRw0PDPikDmOQdfL0AQu9I9RfxM7rL2th5sCRO6Q00eXATR9aQ');
      const body = {
        products: cart,
      };
      const headers = {
        'Content-Type': 'application/json',
      };
      const response = await fetch('http://localhost:7000/api/create-checkout-session', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
      });

      const responseData = await response.json();
      const { sessionId } = responseData;  // Extract sessionId from the response
      
  
      if (!sessionId) {
        console.error('Session ID is missing from the server response');
        // Handle the missing sessionId error appropriately
        return;
      }
  
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });
  
      if (result.error) {
        console.error(result.error);
        // Handle the error, display it to the user, etc.
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle unexpected errors during payment processing
    }
  };
  

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart-items">
        {cart.map((product) => (
          <div className="cartItem" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="description">
              <p>
                <b>{product.name}</b>
              </p>
              <p>Price: ${product.price}</p>
              <div className="countHandler">
                <button onClick={() => handleProductQuantity('dec', product)}>-</button>
                <input value={product.quantity} readOnly />
                <button onClick={() => handleProductQuantity('inc', product)}>+</button>
                <div className="checkout">
                  <button onClick={() => removeFromCart(product.id)}>Remove</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout">
        <p>Subtotal: ${calculateSubtotal()}</p>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
        <button onClick={makePayment}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
