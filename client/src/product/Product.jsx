import React, { useContext } from 'react';
import {useNavigate} from "react-router-dom";
import { Context } from '../context/context';
import Spinner from "../images/spinner.gif"
 // Import your CSS file for styling

const Product = () => {
  const navigate=useNavigate();
  const { loading,data,filter,setFilter,cart,addToCart } = useContext(Context);

  const Loading = () => {
    return (
    <>
    <div className="img-content">
     <img src={Spinner} alt="" />
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
      {filter.map((product)=>(
        <div className="product" key={product.id}>
        <div className="img-container">
          <img src={product.image} alt={product.title} />
        </div>
        <h3>{product.title}</h3>
        <p className='product-description'>{product.description}</p>
        <p><b>&#8377;{product.price}</b></p>
        <div className="product-actions">
          <button className="buy-now-button" onClick={()=>navigate(`/singleProduct/${product.id}`)}>Buy Now</button>
          <button className="add-to-cart-button" onClick={()=>addToCart(product.id)}>Add to Cart</button>
        </div>
      </div>
      ))}
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
