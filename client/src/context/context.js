import React, { createContext, useEffect, useState } from 'react'
export const Context=createContext();

const ShopContextProvider = ({children}) => {
  const [data,setData]=useState([])
  const [filter,setFilter]=useState(data);
  const [loading,setLoading]=useState(false)
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
 

  return (
    <Context.Provider value={{
      data,
      setData,
      filter,
      setFilter,
      setData,
      loading,
      setLoading,

    }}>
      {children}
    </Context.Provider>
  )
}

export default ShopContextProvider
