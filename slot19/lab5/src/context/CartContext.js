import React, { createContext, useEffect, useMemo, useReducer } from "react";


export const CartContext = createContext();


const initialState = { items: [] }; // each: {id, name, image, price, quantity}


function reducer(state, action) {
switch (action.type) {
case "LOAD":
return { items: action.payload || [] };
case "ADD": {
const found = state.items.find((i) => i.id === action.payload.id);
if (found) {
return {
items: state.items.map((i) =>
i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
),
};
}
return { items: [...state.items, { ...action.payload, quantity: 1 }] };
}
case "UPDATE":
return {
items: state.items.map((i) =>
i.id === action.payload.id ? { ...i, quantity: Math.max(1, action.payload.quantity) } : i
),
};
case "REMOVE":
return { items: state.items.filter((i) => i.id !== action.payload) };
case "CLEAR":
return initialState;
default:
return state;
}
}


export const CartProvider = ({ children }) => {
const [state, dispatch] = useReducer(reducer, initialState);


useEffect(() => {
const saved = JSON.parse(localStorage.getItem("cart.items"));
if (saved) dispatch({ type: "LOAD", payload: saved });
}, []);


useEffect(() => {
localStorage.setItem("cart.items", JSON.stringify(state.items));
}, [state.items]);


const totalItems = useMemo(() => state.items.reduce((a, i) => a + i.quantity, 0), [state.items]);
const totalValue = useMemo(
() => state.items.reduce((a, i) => a + i.quantity * parseFloat(i.price), 0).toFixed(2),
[state.items]
);


const value = {
items: state.items,
totalItems,
totalValue,
add: (p) => dispatch({ type: "ADD", payload: p }),
update: (id, quantity) => dispatch({ type: "UPDATE", payload: { id, quantity } }),
remove: (id) => dispatch({ type: "REMOVE", payload: id }),
clear: () => dispatch({ type: "CLEAR" }),
};


return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};