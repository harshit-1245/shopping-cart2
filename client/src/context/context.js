// ShopContextProvider.js
import React, { createContext, useEffect, useState } from 'react';
import LoadingBar from "react-top-loading-bar"
import {useParams} from "react-router-dom"

import axios from "axios"

export const Context = createContext();

const ShopContextProvider = ({ children }) => {

  const [progress,setProgress]=useState(100)
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [category,setCategory]=useState([])
 



  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await axios.get("https://dummyjson.com/products")
      
      setData(response.data.products);
      setFilter(response.data.products);
      setLoading(false);
    };
    getProducts();
  }, []); 

  useEffect(()=>{
      const fetchCategory=async()=>{
   const response=await axios.get("https://dummyjson.com/products/categories")
   setCategory(response.data)
      }
      fetchCategory()
  },[])

 


  const calculateCartCount=()=>{
    return cart.reduce((totalCount,item)=>totalCount + item.quantity,0);
  }

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

  //loading bar logic
  const LoadingBarWithContext=(
    <LoadingBar
    color='#f11946'
    progress={progress}
    onLoaderFinished={()=>setProgress(0)}
    />
  )
  //2 min delay


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
        calculateCartCount,
        progress,
        setProgress,
      
       LoadingBar: LoadingBarWithContext,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ShopContextProvider;
