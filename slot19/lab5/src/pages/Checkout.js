import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useToast } from "../hooks/useToast";


export default function Checkout() {
const { user } = useContext(AuthContext);
const { items, totalValue, clear } = useContext(CartContext);
const toast = useToast();
const navigate = useNavigate();


useEffect(() => {
if (!user) {
// Không đăng nhập thì vẫn vào được trang demo; thực tế nên protect route
}
}, [user]);


const submit = () => {
if (!items.length) return toast.error("Your cart is empty");
toast.success("Payment succeeded. Thank you!");
clear();
navigate("/");
};


return (
<div>
<h2>Checkout</h2>
<p className="muted">{user ? `Checking out as ${user.email}` : "Guest checkout"}</p>
<ul>
{items.map((i) => (
<li key={i.id}>{i.name} x {i.quantity} — ${(i.quantity * parseFloat(i.price)).toFixed(2)}</li>
))}
</ul>
<h3>Total: ${totalValue}</h3>
<button className="btn" onClick={submit}>Confirm & Pay</button>
</div>
);
}