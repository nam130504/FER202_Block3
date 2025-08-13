import React from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const wrap = {
  position: "sticky",
  top: 0,
  zIndex: 20,
  background: "#ffffffcc",
  backdropFilter: "saturate(180%) blur(8px)",
  borderBottom: "1px solid #e5e7eb"
};
const container = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "14px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};
const brand = { display: "flex", alignItems: "center", gap: 10, fontWeight: 700, color: "#0f3d2e" };
const nav = { display: "flex", gap: 18, color: "#374151", fontWeight: 500, alignItems: "center" };
const pill = {
  padding: "10px 14px",
  borderRadius: 999,
  background: "#0f3d2e",
  color: "#fff",
  fontWeight: 600,
  border: "none"
};
const badge = {
  marginLeft: 6,
  background: "#fff",
  color: "#0f3d2e",
  borderRadius: 12,
  padding: "2px 8px",
  fontSize: 12,
  fontWeight: 700
};

export default function Header({ cartCount = 0, favCount = 0 }) {
  return (
    <header style={wrap}>
      <div style={container}>
        {/* Logo */}
        <div style={brand}>
          <span style={{ fontSize: 22 }}>🥗</span>
          <span>Healthy Recipe Finder</span>
        </div>

        {/* Navigation */}
        <nav style={nav}>
          <Link to="/">Home</Link>
          <a href="#about">About</a>
          <a href="#recipes" style={{ fontWeight: 700 }}>Recipes</a>
          <Link to="/request">Recipe Request Form</Link>
          <a href="#favourites" style={{ display: "flex", alignItems: "center" }}>
            <Heart size={16} style={{ marginRight: 4 }} /> Favourites
            <span style={badge}>{favCount}</span>
          </a>
        </nav>

        {/* Cart Button */}
        <button style={pill}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ShoppingCart size={18} />
            <span>Browse recipes</span>
            <span style={badge}>{cartCount}</span>
          </div>
        </button>
      </div>
    </header>
  );
}
