
import { Routes, Route } from 'react-router-dom';

import Login from './features/aouth/Login';
import Layout from './pages/basket/Layout';

import Register from './features/aouth/Register';
import Products from './pages/products/product';
import Basket from './pages/basket/basket'; 
import React from 'react';
function App() {
  return (
    <>
    <Layout/>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/basket" element={<Basket />} /> 
      <Route path="/" element={<Products />} />
    </Routes>
    </>
  );
}

export default App;


