// src/components/StudentGrid.jsx
import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import StudentCard from "./StudentCard";

export default function StudentGrid({ students, onView }) {
  if (!students.length) return <p className="text-center">No students found.</p>;

  return (
    <Row className="g-4">
      {students.map((student) => {
        // luôn có avatar, fallback nếu trống
        const avatarSrc = student.avatar && student.avatar.trim() !== ""
          ? student.avatar
          : "/img/default-avatar.png";

        return (
          <Col key={student.id} xs={12} sm={6} md={4} lg={3}>
            <StudentCard student={{ ...student, avatar: avatarSrc }} onView={onView} />
          </Col>
        );
      })}
    </Row>
  );
}

StudentGrid.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string,
      email: PropTypes.string,
      age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      avatar: PropTypes.string,
    })
  ).isRequired,
  onView: PropTypes.func,
};

StudentGrid.defaultProps = {
  onView: null,
};
