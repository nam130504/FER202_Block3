import React, { useContext } from "react";
import { FavouriteContext } from "../context/FavouriteContext";
import ProductGrid from "../components/products/ProductGrid";


export default function FavouritesPage() {
const { favourites } = useContext(FavouriteContext);
return (
<div>
<h2>My Favourites</h2>
<ProductGrid products={favourites} />
</div>
);
}