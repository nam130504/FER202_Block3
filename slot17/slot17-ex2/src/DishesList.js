import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";

// DishesList component renders the list of dishes and adds them to the cart
const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <h2>Danh sách món ăn</h2>
      <div className="dishes">
        {dishes.map((dish) => (
          <div key={dish.id} className="dish-item">
            <img src={dish.image} alt={dish.name} />
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p>{`Price: $${parseFloat(dish.price).toFixed(2)}`}</p>
            <button onClick={() => addToCart(dish)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Prop validation to ensure proper data structure
DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DishesList;

