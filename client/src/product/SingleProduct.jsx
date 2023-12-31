import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../context/context';
import Spinner from '../images/spinner.gif';

const SingleProduct = () => {
  const { id } = useParams();
  const { loading, data, addToCart } = useContext(Context);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const foundProduct = data.find((item) => item.id.toString() === id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [data, id]);

  const LoadingProduct = () => {
    return (
      <div className="img-content">
        <img src={Spinner} alt="" />
      </div>
    );
  };

  const ShowProductDetails = () => {
    return (
      <div className="product-details">
        <h2>{product.title}</h2>
        <img src={product.thumbnail} alt={product.title} />
        <p><b>{product.description}</b></p>
        <p>Price: ${product.price}</p>
        <button onClick={() => addToCart(product.id)}>Add to Cart</button>
      </div>
    );
  };

  return (
    <div className="single-product-container">
      {loading ? <LoadingProduct /> : product ? <ShowProductDetails /> : <p>Product not found</p>}
    </div>
  );
};

export default SingleProduct;
