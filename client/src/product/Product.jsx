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
  
  const { loading,data,filter,setFilter,cart,addToCart,LoadingBar,category} = useContext(Context);

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
  const filterProduct = (selectedCategory) => {
    const updateList = data.filter((product) =>
      product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
    setFilter(updateList);
  };
  

  const ShowProducts = () => {
    return (
      <>
     
     {filter.length > 0 && (
        <div className="products_container">
          {filter.slice(page, page * 10).map((item) => (
            <div className="products__single" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <span>{item.title}</span>
              <div className="buttons-container">
                <button onClick={() => addToCart(item.id)}>Add to Cart</button>
                <button onClick={() => handleBuyNow(item.id)}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* pagination */}
      {filter.length > 0 && (
        <div className="pagination">
          <span
            className={page > filter.length / 3 ? "products__disabled" : ""}
            onClick={() => setPage(page - 1)}
          >
            <GrLinkPrevious />
          </span>
          {Array.from({ length: Math.ceil(filter.length / 3) }).map((_, i) => (
            <span
              className={page === i + 1 ? "page__selected" : ""}
              key={i}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span
            className={page < filter.length / 3 ? "products__disabled" : ""}
            onClick={() => setPage(page + 1)}
          >
            <GrLinkNext />
          </span>
        </div>
      )}

      </>
    );
  };

  return (
    <div className="product-container">
      <header className="category-header">Category</header>
      <div className="categories">
        {category.map((item,index)=>(
          <button key={index} onClick={()=>filterProduct(item)}>{item}</button>
        ))}
      </div>
      <div className="products-container">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Product;
