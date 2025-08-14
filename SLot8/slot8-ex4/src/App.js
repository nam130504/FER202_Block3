import React from "react";
import Welcome from "./components/Welcome";
import UserProfile from "./components/UserProfile";
import NameList from "./components/NameList";
import StudentCard from "./components/StudentCard";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // đảm bảo import file CSS bạn đã chỉnh

function App() {
  const userData = { name: "namnvde180028@fpt.edu.vn", age: 39 };
  const namesList = ["namnvde180028@fpt.edu.vn", "test@fe.edu.vn"];

  const students = [
    { name: "namnvde180028@fpt.edu.vn", age: 39, avatar: "/img1.jpg" },
    { name: "namnvde180028@fpt.edu.vn", age: 40, avatar: "/img2.jpg" },
    { name: "namnvde180028@fpt.edu.vn", age: 41, avatar: "/img3.jpg" },
  ];

  return (
    <>
      {/* Exercise 1 + 2 */}
      <div>
        <Welcome name="namnvde180028@fpt.edu.vn" />
        <UserProfile user={userData} />
      </div>

      {/* Exercise 3 */}
      <div className="section email-list">
        <h2>Hello</h2>
        <NameList names={namesList} />
      </div>

      {/* Exercise 4 */}
      <Container className="section">
        <h1 className="my-4 text-center">Student Information</h1>
        <Row>
          {students.map((student, index) => (
            <Col key={index} sm={12} md={4}>
              <StudentCard student={student} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
