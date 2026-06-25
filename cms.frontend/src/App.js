import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Shop from "./pages/shop";
import ProductDetail from "./pages/product-detail";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog/BlogDetail";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Login from "./pages/login";
import Register from "./pages/register";
import "./App.css";

function App() {
  return (
    <Router>
      <main className="min-vh-100 bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <div className="container text-center py-5 my-5">
                <h2>404 - KHÔNG TÌM THẤY TRANG</h2>
                <a href="/" className="btn btn-dark btn-sm mt-2">
                  Quay lại Trang Chủ
                </a>
              </div>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
