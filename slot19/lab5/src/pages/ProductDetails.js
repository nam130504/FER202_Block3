import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../data/products";
import { CartContext } from "../context/CartContext";
import { FavouriteContext } from "../context/FavouriteContext";
import { useToast } from "../hooks/useToast";


export default function ProductDetails() {
    const { id } = useParams();
    const item = products.find((p) => String(p.id) === String(id));
    const navigate = useNavigate();
    const { add } = useContext(CartContext);
    const { favourites, toggleFavourite } = useContext(FavouriteContext);
    const toast = useToast();


    if (!item) return <p>Product not found.</p>;


    const isFav = favourites.some((f) => f.id === item.id);


    return (
        <div className="row" style={{ alignItems: "flex-start" }}>
            <img src={item.image} alt={item.name} style={{ width: 320, height: 240, objectFit: "cover", borderRadius: 12 }} />
            <div style={{ flex: 1, minWidth: 280 }}>
                <h2>{item.name}</h2>
                <p className="muted">{item.description}</p>
                <h3>${parseFloat(item.price).toFixed(2)}</h3>
                <div className="row">
                    <button className="btn" onClick={() => { add(item); toast.success("Added to cart"); }}>Add to Cart</button>
                    <button className="btn" onClick={() => navigate("/products")}>Back to List</button>
                    <button
  className="btn"
  onClick={() => {
    if (isFav) {
      navigate("/favourites");
    } else {
      toggleFavourite(item);
      toast.success("Added to favourites");
    }
  }}
>
  {isFav ? "Browse to My Favourite" : "Add to Favourite"}
</button>
                </div>
            </div>
        </div>
    );
}