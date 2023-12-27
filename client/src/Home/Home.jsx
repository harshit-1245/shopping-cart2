import React from 'react'
import "./Home.scss"
import Banner from './Banner/Banner'
import Shop from '../pages/Shop'


const Home = () => {
  return (
    <>
      <Banner/>
      
       <div className="main-content">
        <div className="layout">
        <Shop/>
       </div>
       </div>
       </>
  )
}

export default Home
