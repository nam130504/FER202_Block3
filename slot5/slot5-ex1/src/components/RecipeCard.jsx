import React from "react";
import { Users, Timer, CookingPot } from "lucide-react";

const fallback =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>
      <rect width='100%' height='100%' fill='#e5efe9'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='22' fill='#0f3d2e'>Recipe Image</text>
    </svg>`
  );

export default function RecipeCard({ recipe, onView }) {
  const { title, description, servings, prep, cook, image } = recipe;
  return (
    <article className="card">
      <div className="card-media">
        <img
          src={image}
          alt={title}
          onError={(e) => (e.currentTarget.src = fallback)}
          loading="lazy"
        />
      </div>

      <div className="card-body">
        <h3 className="card-title" title={title}>{title}</h3>
        <p className="card-desc">{description}</p>

        <ul className="meta">
          <li><Users size={16} /> Servings: {servings}</li>
          <li><Timer size={16} /> Prep: {prep} mins</li>
          <li><CookingPot size={16} /> Cook: {cook} mins</li>
        </ul>

        <button className="btn" onClick={onView}>View Recipe</button>
      </div>
    </article>
  );
}
