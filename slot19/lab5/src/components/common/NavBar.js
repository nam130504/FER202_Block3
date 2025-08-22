import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { CartContext } from "../../context/CartContext";
import { FavouriteContext } from "../../context/FavouriteContext";
import { AuthContext } from "../../context/AuthContext";


export default function NavBar() {
const { dark, toggle } = useContext(ThemeContext);
const { totalItems } = useContext(CartContext);
const { favourites } = useContext(FavouriteContext);
const { user, login, logout } = useContext(AuthContext);
const navigate = useNavigate();


return (
<header className="nav">
<div className="left">
<Link to="/" style={{ marginRight: 16, fontWeight: 800 }}>🍕 FoodStore</Link>
<NavLink to="/" end>Home</NavLink>
<NavLink to="/products">Products</NavLink>
<NavLink to="/register">Register</NavLink>
</div>
<div className="right">
<button className="iconbtn" onClick={toggle}>{dark ? "🌙" : "☀️"} Theme</button>
<NavLink to="/favourites">❤️ Favourites <span className="badge">{favourites.length}</span></NavLink>
<NavLink to="/cart">🛒 Cart <span className="badge">{totalItems}</span></NavLink>
{user ? (
<>
<span className="muted">Hi, {user.name}</span>
<button onClick={() => { logout(); navigate("/"); }}>Logout</button>
</>
) : (
<button onClick={() => login()}>Login</button>
)}
</div>
</header>
);
}