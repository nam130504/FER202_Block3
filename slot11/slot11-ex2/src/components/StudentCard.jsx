// src/components/StudentCard.jsx
import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export default function StudentCard({ student, onView }) {
  const handleView = () => {
    if (onView) {
      onView(student);
    } else {
      alert(`Chi tiết sinh viên:\n\nID: ${student.id}\nTên: ${student.name}\nTuổi: ${student.age}\nEmail: ${student.email}`);
    }
  };

  const avatarSrc = student.avatar && student.avatar.trim() !== ""
    ? student.avatar
    : "/img/default-avatar.png"; // fallback avatar

  return (
    <Card className="h-100 shadow-sm rounded text-center">
      <Card.Img
        variant="top"
        src={avatarSrc}
        alt={student.name || "Student"}
        style={{ objectFit: "cover", height: "200px" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{student.name || "No Name"}</Card.Title>
        <Card.Text>
          <strong>ID:</strong> {student.id} <br />
          <strong>Email:</strong> {student.email || "N/A"} <br />
          <strong>Age:</strong> {student.age ?? "N/A"}
        </Card.Text>
        <Button variant="primary" onClick={handleView} className="mt-auto">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    avatar: PropTypes.string,
  }).isRequired,
  onView: PropTypes.func,
};

StudentCard.defaultProps = {
  onView: null,
};
