// src/components/ProfileForm.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Toast, Modal, Card } from "react-bootstrap";

export default function ProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Validation
  const isValidName = name.trim() !== "";
  const isValidEmail = email.includes("@");
  const isValidAge = age >= 1;
  const isFormValid = isValidName && isValidEmail && isValidAge;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Profile Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!isValidName && name !== ""}
          />
          <Form.Control.Feedback type="invalid">
            Name cannot be empty!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!isValidEmail && email !== ""}
          />
          <Form.Control.Feedback type="invalid">
            Email must contain '@'
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            isInvalid={!isValidAge && age !== ""}
          />
          <Form.Control.Feedback type="invalid">
            Age must be at least 1
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={!isFormValid}>
          Submit
        </Button>
      </Form>

      {/* Toast */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={2000}
        autohide
        bg="success"
        className="mt-3"
      >
        <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
      </Toast>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submission Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p><b>Name:</b> {name}</p>
              <p><b>Email:</b> {email}</p>
              <p><b>Age:</b> {age}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </div>
  );
}

// PropTypes validation
ProfileForm.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
