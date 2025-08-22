import React from "react";


export default function SearchFilter({ keyword, setKeyword, sort, setSort }) {
return (
<div className="row" style={{ marginBottom: 16 }}>
<input className="input" placeholder="Search by name or description..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
<select className="input" style={{ maxWidth: 220 }} value={sort} onChange={(e) => setSort(e.target.value)}>
<option value="name-asc">Name ↑</option>
<option value="name-desc">Name ↓</option>
<option value="price-asc">Price ↑</option>
<option value="price-desc">Price ↓</option>
</select>
</div>
);
}