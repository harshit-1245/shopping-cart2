// ShopContextProvider.js
import React, { createContext, useEffect, useState } from 'react';

export const Context = createContext();

const ShopContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      const fetchedData = await response.json();
      setData(fetchedData);
      setFilter(fetchedData);
      setLoading(false);
    };
    getProducts();
  }, []);

  const addToCart = (productId) => {
    const productToAdd = data.find((product) => product.id === productId);
    if (productToAdd) {
      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex((item) => item.id === productId);
        if (existingItemIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].quantity += 1;
          return updatedCart;
        } else {
          return [...prevCart, { ...productToAdd, quantity: 1 }];
        }
      });
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
 
  //product quantity using event 
  const handleProductQuantity=(type,product)=>{
    let items=[...cart];
    let index=items.findIndex((p)=>p.id===product.id);
    if(type === 'inc'){
      items[index].quantity +=1;
    }else if(type === 'dec'){
      if(items[index].quantity ===1) return;
      items[index].quantity -=1;
    }else{
      items[index].quantity -=1;
    }
    setCart(items);
  }

  return (
    <Context.Provider
      value={{
        data,
        setData,
        filter,
        setFilter,
        loading,
        setLoading,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        calculateSubtotal,
        handleProductQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ShopContextProvider;
