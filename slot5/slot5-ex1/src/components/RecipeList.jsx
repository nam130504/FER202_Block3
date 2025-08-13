import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, onView }) {
  if (!recipes.length) {
    return <p className="muted">Không tìm thấy món phù hợp…</p>;
  }
  return (
    <div className="grid">
      {recipes.map((r) => (
        <RecipeCard key={r.title} recipe={r} onView={() => onView(r)} />
      ))}
    </div>
  );
}
