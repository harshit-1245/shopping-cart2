import React, { useContext, useState } from 'react';
import {useNavigate,useParams} from "react-router-dom";
import { Context } from '../context/context';
import "./Product.css"
import Spinner from "../images/spinner.gif"
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

 // Import your CSS file for styling

const Product = () => {
const [page,setPage]=useState(1);

  const navigate=useNavigate();
  
  const { loading,data,filter,setFilter,cart,addToCart,LoadingBar } = useContext(Context);

  const handleBuyNow=(productId)=>{
    navigate(`/singleProduct/${productId}`)
  }

  const Loading = () => {
    return (
    <>
    <div className="img-content">
      
            {LoadingBar}
            </div>
      </>
    )
  };
  const filterProduct=(cat)=>{
    const updateList=data.filter((x)=>x.category === cat);
    setFilter(updateList);
  }

  const ShowProducts = () => {
    return (
      <>
      <div className="buttons">
        <button onClick={()=>setFilter(data)}>All</button>
        <button onClick={()=>filterProduct("men's clothing")}>Men's clothing</button>
        <button onClick={()=>filterProduct("women's clothing")}>Women's Clothing</button>
        <button onClick={()=>filterProduct("jewelery")}>Jwelery</button>
        <button onClick={()=>filterProduct("electronics")}>Electronic</button>
       
      </div>
      {filter.length > 0 && (
       <div className="products_container">
       {filter.slice(page, page * 10).map((item) => (
         <div className="products__single" key={item.id}>
           <img src={item.thumbnail} alt={item.title} />
           <span>{item.title}</span>
           <div class="buttons-container">
        <button onClick={() => addToCart(item.id)}>Add to Cart</button>
        <button onClick={()=>handleBuyNow(item.id)}>Buy Now</button>
      </div>
         </div>
          ))}
        </div>
      )}

      {/* pagination */}
      {filter.length > 0 && <div className='pagination'>
        <span className='prev'><GrLinkPrevious/></span>
        {[...Array(filter.length/3)].map((_,i)=>{
          return <span key={i}>{i+1}</span>
        })}
        <span className='next'><GrLinkNext/></span>
        </div>
        }
      </>
    );
  };

  return (
    <div className="product-container">
      <header className="category-header">Category</header>
      <div className="products-container">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Product;
