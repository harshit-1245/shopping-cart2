import React, { useEffect, useState } from 'react'
import Spinner from "../images/spinner.gif"
import {useParams} from "react-router-dom";


const SingleProduct = () => {

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
console.log(product)
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
   <div className="box">
   <div className='image-container'>
    <img src={product.image} alt="" height="400px" width="400px" />
   </div>
    <div className="title">Product Category</div>
    <div className="div">Product title</div>
    <div className="rating">Rating</div>

    <div className="div">Price</div>
    <div className="desc">desc</div>
    <button>Add To Cart</button>
    <button>Go to cart</button>
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
