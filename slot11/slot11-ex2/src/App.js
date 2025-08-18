// src/App.js
import React, { useState, useMemo } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import students from "./data/students";
import StudentGrid from "./components/StudentGrid";
import StudentDetailModal from "./components/StudentDetailModal";
import AppNavbar from "./components/Navbar"; // thêm Navbar

export default function App() {
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sort, setSort] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    return students
      // Filter by search
      .filter((s) => {
        const name = s.name?.toLowerCase() || "";
        const email = s.email?.toLowerCase() || "";
        return name.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
      })
      // Filter by age
      .filter((s) => {
        if (ageFilter === "<=20") return s.age <= 20;
        if (ageFilter === "21-25") return s.age >= 21 && s.age <= 25;
        if (ageFilter === ">25") return s.age > 25;
        return true;
      })
      // Filter hasAvatar
      .filter((s) => (hasAvatar ? s.avatar && s.avatar.trim() !== "" : true))
      // Sort
      .sort((a, b) => {
        if (sort === "age-asc") return a.age - b.age;
        if (sort === "age-desc") return b.age - a.age;
        if (sort === "name-asc") return a.name.localeCompare(b.name);
        if (sort === "name-desc") return b.name.localeCompare(a.name);
        return 0;
      })
      // Map fallback avatar
      .map((s) => ({
        ...s,
        avatar: s.avatar && s.avatar.trim() !== "" ? s.avatar : "/img/default-avatar.png",
      }));
  }, [search, ageFilter, hasAvatar, sort]);

  return (
    <>
      {/* Navbar chứa links + Quick search */}
      <AppNavbar search={search} setSearch={setSearch} />

      <Container className="my-4">
        <h2 className="text-center mb-4">Student Management</h2>

        <Row className="mb-3 g-2">
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>

          <Col md={3}>
            <Form.Select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
              <option value="">All ages</option>
              <option value="<=20">≤ 20</option>
              <option value="21-25">21-25</option>
              <option value=">25">{">"} 25</option>
            </Form.Select>
          </Col>

          <Col md={2} className="d-flex align-items-center">
            <Form.Check
              type="checkbox"
              label="Has Avatar"
              checked={hasAvatar}
              onChange={(e) => setHasAvatar(e.target.checked)}
            />
          </Col>

          <Col md={4}>
            <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">No sort</option>
              <option value="age-asc">Age Ascending</option>
              <option value="age-desc">Age Descending</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Student grid */}
        <StudentGrid students={filteredStudents} onView={setSelectedStudent} />

        {/* Student detail modal */}
        {selectedStudent && (
          <StudentDetailModal
            student={selectedStudent}
            show={!!selectedStudent}
            onHide={() => setSelectedStudent(null)}
          />
        )}
      </Container>
    </>
  );
}
