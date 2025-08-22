import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
export default function CartPage() {
const { items, update, remove, clear, totalValue } = useContext(CartContext);
const { user } = useContext(AuthContext);
const navigate = useNavigate();


const goCheckout = () => {
if (!user) return navigate("/checkout"); //
navigate("/checkout");
};


if (!items.length)
return (
<div>
<h2>Your Cart</h2>
<p className="muted">Your cart is empty.</p>
<button className="btn" onClick={() => navigate("/products")}>Continue Shopping</button>
</div>
);


return (
<div>
<h2>Your Cart</h2>
<table className="table">
<thead>
<tr>
<th>Item</th>
<th>Price</th>
<th>Qty</th>
<th>Total</th>
<th></th>
</tr>
</thead>
<tbody>
{items.map((i) => (
<tr key={i.id}>
<td>
<div className="row" style={{ alignItems: "center" }}>
<img src={i.image} alt={i.name} />
<div>
<div style={{ fontWeight: 700 }}>{i.name}</div>
<div className="muted">#{i.id}</div>
</div>
</div>
</td>
<td>${parseFloat(i.price).toFixed(2)}</td>
<td>
<input
className="input qty"
type="number"
min="1"
value={i.quantity}
onChange={(e) => update(i.id, parseInt(e.target.value || 1, 10))}
/>
</td>
<td>${(parseFloat(i.price) * i.quantity).toFixed(2)}</td>
<td>
<button className="btn" onClick={() => remove(i.id)}>Remove</button>
</td>
</tr>
))}
</tbody>
</table>


<div className="row" style={{ justifyContent: "space-between", marginTop: 16 }}>
<div>
<button className="btn" onClick={() => navigate("/products")}>Continue Shopping</button>
<button className="btn" onClick={clear} style={{ marginLeft: 8 }}>Clear Cart</button>
</div>
<div style={{ fontWeight: 800 }}>Order Total: ${totalValue}</div>
</div>


<div style={{ marginTop: 16 }}>
<button className="btn" onClick={goCheckout}>Proceed to Checkout</button>
</div>
</div>
);
}