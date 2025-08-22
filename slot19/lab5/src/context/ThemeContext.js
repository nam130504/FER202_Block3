import React, { createContext, useEffect, useState } from "react";


export const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
const [dark, setDark] = useState(false);


useEffect(() => {
const saved = localStorage.getItem("theme.dark");
if (saved !== null) setDark(JSON.parse(saved));
}, []);


useEffect(() => {
localStorage.setItem("theme.dark", JSON.stringify(dark));
document.documentElement.classList.toggle("dark", dark);
}, [dark]);


const toggle = () => setDark((v) => !v);


return (
<ThemeContext.Provider value={{ dark, toggle }}>
{children}
</ThemeContext.Provider>
);
};