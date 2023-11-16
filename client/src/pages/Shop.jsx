// Shop.js

import React, { useContext, useEffect, useState } from 'react';

import '../product/Product';
import Product from '../product/Product';
import { Context } from '../context/context';

const Shop = () => {
 
  
  return (
    
     <div className='product-section'>
        <Product />
      </div>
    
  );
};

export default Shop;
