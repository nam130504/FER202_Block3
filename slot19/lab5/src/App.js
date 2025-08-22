import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/common/NavBar";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { FavouriteProvider } from "./context/FavouriteContext";


export default function App() {
return (
<ThemeProvider>
<AuthProvider>
<CartProvider>
<FavouriteProvider>
<NavBar />
<main className="container">
<AppRoutes />
</main>
<ToastContainer position="top-right" autoClose={1500} />
</FavouriteProvider>
</CartProvider>
</AuthProvider>
</ThemeProvider>
);
}