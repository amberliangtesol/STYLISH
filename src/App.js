import "./css/index.css";
import "./css/normalize.css";
import Header from "./components/Header.js";
import Product from "./components/Product.js";
import Footer from "./components/Footer.js";
import Checkout from "./components/Checkout.js";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [totalProduct, setTotalProduct] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((total, item) => total + item.qty, 0);
    setTotalProduct(totalQuantity);
    //console.log("cart",cart);
    //console.log("totalQuantity",totalQuantity);
  }, []);

  return (
    <div className="container">
      <Header totalProduct={totalProduct} />
      <Routes>
        <Route
          path="/"
          element={
            <Product
              totalProduct={totalProduct}
              setTotalProduct={setTotalProduct}
            />
          }
        />
        <Route
          path="product"
          element={
            <Product
              totalProduct={totalProduct}
              setTotalProduct={setTotalProduct}
            />
          }
        />
        <Route
          path="checkout"
          element={
            <Checkout
              totalProduct={totalProduct}
              setTotalProduct={setTotalProduct}
            />
          }
        />
      </Routes>
      <Footer totalProduct={totalProduct} />
    </div>
  );
}

export default App;
