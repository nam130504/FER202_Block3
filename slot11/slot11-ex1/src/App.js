// src/App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileForm from "./components/ProfileForm";

function App() {
  return (
    <div className="App">
      <h1 className="text-center mt-4">Using Hooks - Exercise 1</h1>
      <ProfileForm />
    </div>
  );
}

export default App;
