// Cart.js
import React, { useContext } from 'react';
import { Context } from '../context/context';

const Cart = () => {
  const { cart, removeFromCart, addToCart,calculateSubtotal} = useContext(Context);

  const handleAddToCart = (productId) => {
    addToCart(productId);
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
                <button onClick={() => removeFromCart(product.id)}>-</button>
                <input value={product.quantity} readOnly />
                <button onClick={() => handleAddToCart(product.id)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout">
        <p>Subtotal: ${calculateSubtotal()}</p>
        <button>Continue Shopping</button>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
