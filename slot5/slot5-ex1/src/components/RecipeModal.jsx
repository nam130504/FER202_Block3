import React, { useEffect } from "react";
import { X, ShoppingCart, Users, Timer, CookingPot } from "lucide-react";

const fallback =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>
      <rect width='100%' height='100%' fill='#e5efe9'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='26' fill='#0f3d2e'>Recipe Image</text>
    </svg>`
  );

export default function RecipeModal({ recipe, onClose, onAdd }) {
  // Close on Esc
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="modal-media">
          <img
            src={recipe.image}
            alt={recipe.title}
            onError={(e) => (e.currentTarget.src = fallback)}
          />
        </div>

        <div className="modal-body">
          <h2>{recipe.title}</h2>
          <p className="modal-desc">{recipe.description}</p>
          <ul className="meta modal-meta">
            <li><Users size={16} /> Servings: {recipe.servings}</li>
            <li><Timer size={16} /> Prep: {recipe.prep} mins</li>
            <li><CookingPot size={16} /> Cook: {recipe.cook} mins</li>
          </ul>

          <div className="modal-actions">
            <button className="btn" onClick={onAdd}>
              <ShoppingCart size={18} />
              <span style={{ marginLeft: 8 }}>Add to Cart</span>
            </button>
            <button className="btn outline" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
