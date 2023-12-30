import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Search from '../search/Search';
import { Context } from '../context/context';



const Navbar = () => {
  const [scrolled,setScrolled]=useState(false);
  
  const {calculateCartCount,LoadingBar}=useContext(Context);

const [showSearch,setShowSearch]=useState(false);

const handleScroll = () => {
  const offset = window.pageYOffset; // Corrected to get scroll position
  if (offset > 200) {
    setScrolled(true);
  } else {
    setScrolled(false);
  }
};

useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);


  useEffect(()=>{
    window.addEventListener('scroll',handleScroll);
  },[])


  return (
    <>
    <div className={`navbar ${scrolled ?"sicky-header" : ""}`}>
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
