// src/components/StudentDetailModal.jsx
import React from "react";
import { Modal, Card } from "react-bootstrap";

export default function StudentDetailModal({ student, show, onHide }) {
  if (!student) return null;
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Img variant="top" src={student.avatar || "/images/default-avatar.png"} />
          <Card.Body>
            <Card.Title>{student.name}</Card.Title>
            <Card.Text>Email: {student.email}</Card.Text>
            <Card.Text>Age: {student.age}</Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}
