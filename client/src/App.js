import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Navbar from './navbar/Navbar';
import ShopContextProvider from './context/context';
import SingleProduct from './product/SingleProduct';
import Success from './pages/success';
import Cancel from './pages/cancel';

function App() {
  return (
    <>
    <BrowserRouter>
    <ShopContextProvider>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Shop/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path="/singleProduct/:id" element={<SingleProduct/>}/>
      <Route path='/success' element={<Success/>}/>
      <Route path='/cancel' element={<Cancel/>}/>
    </Routes>
    </ShopContextProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
