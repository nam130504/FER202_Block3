import React, { useEffect, useState } from "react";
import { X, ShoppingCart, Users, Timer, CookingPot } from "lucide-react";
import { FaRegHeart } from "react-icons/fa";

const fallback =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>
      <rect width='100%' height='100%' fill='#e5efe9'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='26' fill='#0f3d2e'>Recipe Image</text>
    </svg>`
  );

export default function RecipeModal({ recipe, onClose, onAdd, onAddFavourite }) {
  const [showToast, setShowToast] = useState(false);

  // Đóng modal khi nhấn ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleAddFavourite = () => {
    if (onAddFavourite) onAddFavourite(recipe);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1050,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          background: "#fff",
          borderRadius: 12,
          maxWidth: 700,
          width: "100%",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="icon-btn"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <div style={{ width: "100%", maxHeight: 350, overflow: "hidden" }}>
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ width: "100%", objectFit: "cover" }}
            onError={(e) => (e.currentTarget.src = fallback)}
          />
        </div>

{/* Content */}
<div style={{ padding: 20 }}>
  <h2>{recipe.title}</h2>
  <p className="modal-desc">{recipe.description}</p>
  <ul className="meta" style={{ listStyle: "none", padding: 0, display: "flex", gap: 16 }}>
    <li><Users size={16} /> Servings: {recipe.servings}</li>
    <li><Timer size={16} /> Prep: {recipe.prep} mins</li>
    <li><CookingPot size={16} /> Cook: {recipe.cook} mins</li>
  </ul>

  {/* Steps */}
  {recipe.steps && recipe.steps.length > 0 && (
    <div style={{ marginTop: 20 }}>
      <h4>Steps:</h4>
      <ol style={{ paddingLeft: 20, lineHeight: 1.6 }}>
        {recipe.steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </div>
  )}

  {/* Actions */}
  <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
    <button className="btn btn-primary d-flex align-items-center" onClick={onAdd}>
      <ShoppingCart size={18} /> <span style={{ marginLeft: 6 }}>Add to Cart</span>
    </button>
    <button className="btn btn-outline-danger d-flex align-items-center" onClick={handleAddFavourite}>
      <FaRegHeart color="#e63946" /> <span style={{ marginLeft: 6 }}>Add to Favourite</span>
    </button>
    <button className="btn btn-outline-secondary" onClick={onClose}>Close</button>
  </div>
</div>

        {/* Toast */}
        {showToast && (
          <div
            style={{
              position: "fixed",
              top: 20,
              right: 20,
              background: "#fff",
              color: "#0f3d2e",
              border: "1px solid #e5efe9",
              borderRadius: 8,
              padding: "10px 18px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              zIndex: 2000,
              fontWeight: 500,
            }}
          >
            Added to favourites
          </div>
        )}
      </div>
    </div>
  );
}
