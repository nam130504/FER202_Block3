import React, { useMemo, useState } from "react";
import { products as all } from "../data/products";
import ProductGrid from "../components/products/ProductGrid";
import SearchFilter from "../components/products/SearchFilter";


export default function Products() {
const [keyword, setKeyword] = useState("");
const [sort, setSort] = useState("name-asc");


const data = useMemo(() => {
const filtered = all.filter(
(p) =>
p.name.toLowerCase().includes(keyword.toLowerCase()) ||
p.description.toLowerCase().includes(keyword.toLowerCase())
);
const sorted = [...filtered].sort((a, b) => {
switch (sort) {
case "name-desc":
return b.name.localeCompare(a.name);
case "price-asc":
return parseFloat(a.price) - parseFloat(b.price);
case "price-desc":
return parseFloat(b.price) - parseFloat(a.price);
case "name-asc":
default:
return a.name.localeCompare(b.name);
}
});
return sorted;
}, [keyword, sort]);


return (
<div>
<h2>Products</h2>
<SearchFilter keyword={keyword} setKeyword={setKeyword} sort={sort} setSort={setSort} />
<ProductGrid products={data} />
</div>
);
}