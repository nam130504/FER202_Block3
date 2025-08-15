import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserForm from "./component/UserForm";
import "./App.css"; // Import CSS tuỳ chỉnh


function App() {
  const handleFormSubmit = (data) => {
    alert("Dữ liệu hợp lệ: " + JSON.stringify(data, null, 2));
  };

  return (
    <div className="App">
      <h1>Ứng Dụng React</h1>
      <UserForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;
