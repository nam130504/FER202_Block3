import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    login(email || "demo@site.dev");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0b1220] px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#0f172a] rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Create Your Account
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            className="input w-full"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input w-full"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input w-full"
            placeholder="Password"
            type="password"
          />
          <button
            className="btn w-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            type="submit"
          >
            Create Account
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
