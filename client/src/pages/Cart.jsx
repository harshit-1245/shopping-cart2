import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/context';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const { cart, removeFromCart, calculateSubtotal, handleProductQuantity } = useContext(Context);
  const navigate = useNavigate();
  const [orderId,setOrderId]=useState('');
  const [razorpayLoaded,setRazorpayLoaded]=useState(false);

useEffect(()=>{
  const loadRazorpay=async()=>{
    const script=document.createElement('script');
    script.src= 'http://checkout.razorpay.com/v1/checkout.js';
    script.onload=()=>setRazorpayLoaded(script);
  };
  loadRazorpay();
},[])


  const generateReceiptId=()=>{
    const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result='';
    const charactersLength=chars.length;
    const length=10;

    for(let i=0;i<length;i++){
      result +=chars.charAt(Math.floor(Math.random()*charactersLength));
    }
    return result;
  }
  const receiptId=generateReceiptId();

  // Payment integration
  const createRazorpayOrder=async()=>{
    try {
      const response=await axios.post('http://localhost:7000/api/create-razorpay-order',{
        amount:calculateSubtotal(),
        currency:'USD',
        reciept:receiptId,
      });
      const {order}=response.data;
      setOrderId(order.id);

      const options = {
        key:'rzp_test_44pVLYU6Z50n9V',
        amount:order.amount,
        currency:order.currency,
        name:'Shopping mania',
        description:'SuccessFully done',
        order_id:order.id,
        handler:function(response){
          console.log(response)
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpay=new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  }
 
  

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
        <button onClick={createRazorpayOrder}>Checkout</button>
        {orderId && <p>OrderID:{orderId}</p>}
      </div>
    </div>
  );
};

export default Cart;
