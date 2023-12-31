import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Navbar from './navbar/Navbar';
import ShopContextProvider from './context/context';
import SingleProduct from './product/SingleProduct';
import Success from './pages/success';
import Cancel from './pages/cancel';
import Home from './Home/Home';
import Footer from './footer/Footer';
import Newsletter from "./newslatter/Newsletter"


function App() {
  return (
    <>
    <BrowserRouter>
    <ShopContextProvider>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path="/singleProduct/:id" element={<SingleProduct/>}/>
     
    </Routes>
    <Newsletter/>
    <Footer/>

    </ShopContextProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
