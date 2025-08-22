import React from "react";
import ProductCard from "./ProductCard";


export default function ProductGrid({ products }) {
if (!products.length) return <p className="muted">No products found.</p>;
return (
<div className="grid">
{products.map((p) => (
<ProductCard key={p.id} product={p} />
))}
</div>
);
}