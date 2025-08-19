import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

// Hàm xác thực đầu vào (ví dụ: kiểm tra độ dài tối thiểu)
const validateInput = (value) => {
  return value.length >= 5; // Yêu cầu: ít nhất 5 ký tự
};

function ValidatedInput() {
  const [value, setValue] = useState("");           // State lưu giá trị nhập
  const [isValid, setIsValid] = useState(true);     // Trạng thái hợp lệ
  const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi

  // useEffect sẽ chạy mỗi khi value thay đổi
  useEffect(() => {
    const isValidInput = validateInput(value);
    setIsValid(isValidInput);

    if (!isValidInput) {
      setErrorMessage("Giá trị phải có ít nhất 5 ký tự!");
    } else {
      setErrorMessage("");
    }
  }, [value]);

  // Xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Giá trị hợp lệ: " + value);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3">
      <Form.Group controlId="validatedInput">
        <Form.Label>Nhập một giá trị</Form.Label>
        <Form.Control
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)} 
          isValid={isValid && value !== ""}    // hợp lệ và đã nhập
          isInvalid={!isValid && value !== ""} // không hợp lệ và đã nhập
        />
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!isValid}>
        Gửi
      </Button>
    </Form>
  );
}

export default ValidatedInput;
