import React from 'react'
import { Link } from 'react-router-dom'
import { FaCartArrowDown } from "react-icons/fa";
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="links">
            <Link className='nav-link' to='/'>Shop</Link>
            <Link className='cart-link' to="/cart">
                <FaCartArrowDown size={32}/>
            </Link>

        </div>
      
    </div>
  )
}

export default Navbar
