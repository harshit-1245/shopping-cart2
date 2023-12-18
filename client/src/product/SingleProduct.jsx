import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom";

import Spinner from "../images/spinner.gif"
import {useParams} from "react-router-dom";
import {Context} from "../context/context"


const SingleProduct = () => {
  const navigate=useNavigate();
  const {addToCart} = useContext(Context)

const {id}=useParams();
const [product,setProduct]=useState([]);
const [loading,setLoading]=useState(false);

useEffect(()=>{
   const getProduct=async()=>{
    setLoading(true);
    const response=await fetch(`https://fakestoreapi.com/products/${id}`)
    setProduct(await response.json());
    setLoading(false);
   }
   getProduct(); 
},[])

const LoadingProduct=()=>{
  return (
    <>
    <div className="img-content">
     <img src={Spinner} alt="" />
     </div>
      </>
    )
}
const ShowProducts=()=>{
  return(
   <>
   <div className="single-product-main-content">
    <div className="layout">
      <div className="single-product-page">
        <div className="left">
          <img src={product.image} alt="" />
        </div>
        <div className="right">
          <span className='name'>{product.title}</span>
          <span className='desc'><b>Description:</b>{product.description}</span>
          <span className='price'>${product.price}</span>
          
          <div className="cart-buttons">
           
            <button className='add-to-cart-button' onClick={()=>addToCart(product.id)}>
               ADD TO CART
            </button>
            <button className='go-to-cart-button' onClick={()=>navigate('/cart')}>
              Go To Cart
            </button>
          </div>
          <span className="divider" />
          <div className="info-item">
            <span className="text-bold">Category:{product.category}</span>
            
           
          </div>
        </div>
      </div>
    </div>
   </div>
   </>
  )
}



  return (
    <div className="container">
       <div className="row">
        {loading ? <LoadingProduct /> : <ShowProducts />}
      </div>
      </div>
    
  )
}

export default SingleProduct
