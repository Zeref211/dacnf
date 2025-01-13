import React from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from '../Component/Home';
import Product from '../Component/Product';
import Qlp from '../Component/Qlp';
import Qlu from '../Component/Qlu';
import Login from '../Component/Login';
import Resigter from '../Component/Resigter';
import ProductDetail from '../Component/ProductDetail';
import Updatep from '../Component/Updatep';
import Updateu from '../Component/Updateu';
import Cart from '../Component/Cart';
import Hoadon from '../Component/Hoadon';
import Loginad from '../Component/Loginad';


function Router() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Product" element={<Product/>}/>
                <Route path="/Qlp" element={<Qlp/>}/>
                <Route path="/Qlu" element={<Qlu/>}></Route>
                <Route path="/Updatep/:id" element={<Updatep/>}></Route>
                <Route path="/Updateu/:id" element={<Updateu/>}></Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/Resigter" element={<Resigter/>}/>
                <Route path="/ProductDetail/:id" element={<ProductDetail/>}/>
                <Route path="/Hoadon" element={<Hoadon/>}/>
                <Route path="/loginad" element={<Loginad/>}/>
               
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router