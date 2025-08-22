import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import CartPage from "../pages/CartPage";
import FavouritesPage from "../pages/FavouritesPage";
import Register from "../pages/Register";
import Checkout from "../pages/Checkout";


export default function AppRoutes() {
return (
<Routes>
<Route path="/" element={<Home />} />
<Route path="/products" element={<Products />} />
<Route path="/products/:id" element={<ProductDetails />} />
<Route path="/cart" element={<CartPage />} />
<Route path="/favourites" element={<FavouritesPage />} />
<Route path="/register" element={<Register />} />
<Route path="/checkout" element={<Checkout />} />
<Route path="*" element={<Navigate to="/" replace />} />
</Routes>
);
}