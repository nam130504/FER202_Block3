import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { FavouriteContext } from "../../context/FavouriteContext";
import { useToast } from "../../hooks/useToast";

export default function ProductCard({ product }) {
  const { add } = useContext(CartContext);
  const { favourites, toggleFavourite } = useContext(FavouriteContext);
  const toast = useToast();

  const isFav = favourites.some((f) => f.id === product.id);

  const handleAddCart = () => {
    add(product);
    toast.success("Added to cart");
  };

  const handleFav = () => {
    if (isFav) {
      toggleFavourite(product); // remove
      toast.success("Removed from favourites");
    } else {
      toggleFavourite(product); // add
      toast.success("Added to favourites");
    }
  };

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <div className="body">
        <div className="title">{product.name}</div>
        <div className="price">${parseFloat(product.price).toFixed(2)}</div>
        <div className="actions">
          <Link className="btn" to={`/products/${product.id}`}>
            View Details
          </Link>
          <button className="btn" onClick={handleAddCart}>
            Add to Cart
          </button>
          <button className="btn" onClick={handleFav}>
            {isFav ? "Remove from Favourite" : "Add to Favourite"}
          </button>
        </div>
      </div>
    </div>
  );
}
