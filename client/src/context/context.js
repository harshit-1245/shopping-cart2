import React, { createContext, useEffect, useState } from 'react'
export const Context=createContext();

const ShopContextProvider = ({children}) => {
  const [data,setData]=useState([])
  const [filter,setFilter]=useState(data);
  const [loading,setLoading]=useState(false)
  const [cart,setCart]=useState([]);
  let componentMounted=true;
   useEffect(()=>{
    const getProducts=async()=>{
      setLoading(true);
      const response=await fetch('https://fakestoreapi.com/products');
      if(componentMounted){
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      
      }
      return ()=>{
        componentMounted=false;
      }
      
    }
    getProducts();
   },[])

   const addToCart=(productId)=>{
      const productToAdd=data.find((product)=>product.id===productId);
      if(productToAdd){
        setCart([...cart,productToAdd]);
      }
   }
   const removeCart=(productId)=>{
    const updateCart=data.filter((product)=>product.id===productId);
    setCart(updateCart);
   }

console.log(cart)
 

  return (
    <Context.Provider value={{
      data,
      setData,
      filter,
      setFilter,
      setData,
      loading,
      setLoading,
      cart,
      addToCart,
      removeCart,

    }}>
      {children}
    </Context.Provider>
  )
}

export default ShopContextProvider
