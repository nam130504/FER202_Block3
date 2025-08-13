import React, { useState } from "react";
import { Users, Timer, CookingPot } from "lucide-react";
import { FaRegHeart } from "react-icons/fa";
import { Toast, ToastContainer } from "react-bootstrap";

const fallback =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>
      <rect width='100%' height='100%' fill='#e5efe9'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='22' fill='#0f3d2e'>Recipe Image</text>
    </svg>`
  );

export default function RecipeCard({ recipe, onView, onAddFavourite }) {
  const { title, description, servings, prep, cook, image } = recipe;
  const [showToast, setShowToast] = useState(false);

  const handleAddFavourite = () => {
    if (onAddFavourite) onAddFavourite(recipe);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <article className="card position-relative">
      <div className="card-media">
        <img
          src={image}
          alt={title}
          onError={(e) => (e.currentTarget.src = fallback)}
          loading="lazy"
          className="img-fluid"
        />
      </div>

      <div className="card-body">
        <h3 className="card-title" title={title}>{title}</h3>
        <p className="card-desc">{description}</p>

        <ul className="meta list-unstyled mb-3">
          <li><Users size={16} /> Servings: {servings}</li>
          <li><Timer size={16} /> Prep: {prep} mins</li>
          <li><CookingPot size={16} /> Cook: {cook} mins</li>
        </ul>

        <button className="btn btn-outline-success me-2" onClick={onView}>
          View Recipe
        </button>
        <button
          className="btn btn-outline-danger d-flex align-items-center gap-2"
          onClick={handleAddFavourite}
        >
          <FaRegHeart /> Add to Favourite
        </button>
      </div>

      {/* Toast hiển thị khi thêm vào favourites */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="light"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
        >
          <Toast.Body className="text-success fw-semibold">
            Added to favourites ❤️
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </article>
  );
}
