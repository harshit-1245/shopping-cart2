// Cart.js
import React, { useContext } from 'react';
import { Context } from '../context/context';
import {useNavigate} from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart,calculateSubtotal,handleProductQuantity} = useContext(Context);

 
 
 
  

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
                <button onClick={() => handleProductQuantity('dec',product)}>-</button>
                <input value={product.quantity} readOnly />
                <button onClick={() => handleProductQuantity('inc',product)}>+</button>
                <div className="checkout">
                <button onClick={()=>removeFromCart(product.id)}>Remove</button>
                </div>
                
                
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
