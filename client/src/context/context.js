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
  console.log(cart)

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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ShopContextProvider;
