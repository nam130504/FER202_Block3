import React from "react";
import "./App.css";

function App() {
  const courses = ["React", "ReactNative", "NodeJs"];

  return (
    <div className="App">
      <h2><b>Course names</b></h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
