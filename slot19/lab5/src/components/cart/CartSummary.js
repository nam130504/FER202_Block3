import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";


export default function CartSummary() {
const { totalItems, totalValue } = useContext(CartContext);
return (
<div className="muted">Items: {totalItems} • Total: ${totalValue}</div>
);
}