import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Search from '../search/Search';
import { Context } from '../context/context';


const Navbar = () => {
  
  const {calculateCartCount,LoadingBar}=useContext(Context);

const [showSearch,setShowSearch]=useState(false);


  return (
    <>
    <div className='navbar'>
        <div className="links">
            <Link className='nav-link' to='/'>Shop</Link>
            <Link className='cart-link' to="/cart">
            <span className='cart-icon'>
                <FaCartArrowDown size={32}/>
                <span className='cart-count'>{calculateCartCount()}</span>
                </span>
               
            </Link>
            <Link className='nav-link'>
       
       <IoIosSearch onClick={()=>setShowSearch(true)}/>  
            </Link>
            
            

        </div>
      
    </div>
   { showSearch && <Search setShowSearch={setShowSearch}/>}

   
    </>
  )
}

export default Navbar
