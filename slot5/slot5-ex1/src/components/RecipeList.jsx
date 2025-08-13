import React, { useState, useMemo, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { Row, Col, Button } from "react-bootstrap";

export default function RecipeList({ recipes, onView, onAddFavourite }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Reset về trang 1 khi danh sách recipes hoặc itemsPerPage thay đổi
  useEffect(() => setCurrentPage(1), [recipes, itemsPerPage]);

  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  const paginatedRecipes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return recipes.slice(start, start + itemsPerPage);
  }, [recipes, currentPage, itemsPerPage]);

  if (!recipes.length) {
    return <p className="text-muted">Không tìm thấy món phù hợp…</p>;
  }

  return (
    <div>
      {/* Items per page */}
      <div className="mb-3">
        <label>Items per page: </label>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={6}>6</option>
          <option value={9}>9</option>
          <option value={12}>12</option>
        </select>
      </div>

      {/* Recipe Cards */}
      <Row className="g-4">
        {paginatedRecipes.map((recipe) => (
          <Col key={recipe.title} xs={12} sm={6} lg={4}>
            <RecipeCard
              recipe={recipe}
              onView={() => onView(recipe)}            // Mở modal
              onAddFavourite={() => onAddFavourite(recipe)}
            />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="d-flex flex-wrap gap-2 align-items-center mt-3">
        <Button size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          {"<<"}
        </Button>
        <Button size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          {"<"}
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Button
            key={p}
            size="sm"
            variant={p === currentPage ? "primary" : "outline-primary"}
            onClick={() => setCurrentPage(p)}
          >
            {p}
          </Button>
        ))}

        <Button size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          {">"}
        </Button>
        <Button size="sm" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
          {">>"}
        </Button>
      </div>
    </div>
  );
}
