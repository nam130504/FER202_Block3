import React, { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);


useEffect(() => {
const saved = localStorage.getItem("auth.user");
if (saved) setUser(JSON.parse(saved));
}, []);


useEffect(() => {
if (user) localStorage.setItem("auth.user", JSON.stringify(user));
else localStorage.removeItem("auth.user");
}, [user]);


const login = (email = "demo@site.dev") => setUser({ id: 1, name: "Demo User", email });
const logout = () => setUser(null);


return (
<AuthContext.Provider value={{ user, login, logout }}>
{children}
</AuthContext.Provider>
);
};