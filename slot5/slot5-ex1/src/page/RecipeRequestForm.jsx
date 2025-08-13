// src/pages/RecipeRequestForm.jsx
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import "../App.css";

export default function RecipeRequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ingredient: "",
    prepTime: "",
    notes: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    ingredient: false,
    prepTime: false,
    notes: false,
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log("Form submitted:", formData);
      alert("Your recipe request has been submitted!");
      setFormData({
        name: "",
        email: "",
        ingredient: "",
        prepTime: "",
        notes: "",
      });
      setTouched({
        name: false,
        email: false,
        ingredient: false,
        prepTime: false,
        notes: false,
      });
    }
    setValidated(true);
  };

  return (
    <div className="recipe-form-container">
      <h2 className="form-title mb-4">Recipe Request Form</h2>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* Name */}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            required
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.name && !formData.name}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your name
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.email && !formData.email}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email
          </Form.Control.Feedback>
        </Form.Group>

        {/* Ingredient */}
        <Form.Group className="mb-3" controlId="ingredient">
          <Form.Label>Desired Ingredient</Form.Label>
          <Form.Control
            type="text"
            placeholder="E.g., Fresh basil, organic chicken..."
            required
            value={formData.ingredient}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.ingredient && !formData.ingredient}
          />
          <Form.Control.Feedback type="invalid">
            Please enter the desired ingredient
          </Form.Control.Feedback>
        </Form.Group>

        {/* Max Prep Time */}
        <Form.Group className="mb-3" controlId="prepTime">
          <Form.Label>Max Prep Time</Form.Label>
          <Form.Select
            required
            value={formData.prepTime}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.prepTime && !formData.prepTime}
          >
            <option value="">Select time</option>
            <option value="5">5 minutes</option>
            <option value="10">10 mins</option>
            <option value="15">15 mins</option>
            <option value="30">30 mins</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select max prep time
          </Form.Control.Feedback>
        </Form.Group>

        {/* Notes */}
        <Form.Group className="mb-3" controlId="notes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Any extra details about your request..."
            value={formData.notes}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Form.Control.Feedback type="invalid">
            Please enter notes (optional)
          </Form.Control.Feedback>
        </Form.Group>

        {/* Submit */}
        <Button type="submit" className="submit-btn">
          <FaPaperPlane className="me-2" />
          Submit Request
        </Button>
      </Form>
    </div>
  );
}
