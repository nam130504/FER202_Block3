import React from "react";
import CarouselSlider from "../components/common/CarouselSlider";
import { products } from "../data/products";
import ProductGrid from "../components/products/ProductGrid";


export default function Home() {
return (
<div>
<CarouselSlider autoplay />
<section className="section">
<h2>Popular Dishes</h2>
<ProductGrid products={products} />
</section>
</div>
);
}