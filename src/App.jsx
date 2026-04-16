import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Login from './components/Login';
import AddPurchase from './components/AddPurchase';
import AddProduct from './components/AddProduct';
import AddSale from './components/AddSale';
import Projects from './components/Projects';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/AddPurchase' element={<AddPurchase />}></Route>
          <Route path='/AddProduct' element={<AddProduct />}></Route>
          <Route path='/AddSale' element={<AddSale />}></Route>
          <Route path='/Projects' element={<Projects />}></Route>
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
