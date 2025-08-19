// src/pages/StudentsPage.jsx
import React, { useState, useMemo } from "react";
import { Container } from "react-bootstrap";
import AppNavbar from "../components/Navbar";
import Filters from "../components/Filters";
import SortDropdown from "../components/SortDropdown";
import StudentGrid from "../components/StudentGrid";
import StudentDetailModal from "../components/StudentDetailModal"; 
import students from "../data/students";

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sort, setSort] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    return students
      // 1️⃣ Filter theo search
      .filter((s) => {
        const name = s.name?.toLowerCase() || "";
        const email = s.email?.toLowerCase() || "";
        return name.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
      })
      // 2️⃣ Filter theo age
      .filter((s) => {
        if (ageFilter === "<=20") return s.age <= 20;
        if (ageFilter === "21-25") return s.age >= 21 && s.age <= 25;
        if (ageFilter === ">25") return s.age > 25;
        return true;
      })
      // 3️⃣ Map fallback avatar, vẫn giữ thông tin hasAvatar
      .map((s) => ({
        ...s,
        avatar: s.avatar && s.avatar.trim() !== "" ? s.avatar : "/img/default-avatar.png",
        _hasAvatar: s.avatar && s.avatar.trim() !== "" // dùng cho highlight nếu muốn
      }))
      // 4️⃣ Sort
      .sort((a, b) => {
        if (sort === "age-asc") return a.age - b.age;
        if (sort === "age-desc") return b.age - a.age;
        if (sort === "name-asc") return a.name.localeCompare(b.name);
        if (sort === "name-desc") return b.name.localeCompare(a.name);
        return 0;
      });
  }, [search, ageFilter, sort]);

  return (
    <>
      <AppNavbar search={search} setSearch={setSearch} />
      <Container className="my-4">
        <h2>Student Management</h2>
        <p>Manage student list with filters and sorting</p>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Filters
            ageFilter={ageFilter}
            setAgeFilter={setAgeFilter}
            hasAvatar={hasAvatar}
            setHasAvatar={setHasAvatar}
          />
          <SortDropdown sort={sort} setSort={setSort} />
        </div>

        {/* Lọc highlight nếu hasAvatar */}
        <StudentGrid
          students={hasAvatar ? filteredStudents.filter(s => s._hasAvatar) : filteredStudents}
          onView={setSelectedStudent}
        />

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
}// src/pages/StudentsPage.jsx
import React, { useState, useMemo } from "react";
import { Container } from "react-bootstrap";
import AppNavbar from "../components/Navbar";
import Filters from "../components/Filters";
import SortDropdown from "../components/SortDropdown";
import StudentGrid from "../components/StudentGrid";
import StudentDetailModal from "../components/StudentDetailModal"; 
import students from "../data/students";

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sort, setSort] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    return students
      // 1️⃣ Filter theo search
      .filter((s) => {
        const name = s.name?.toLowerCase() || "";
        const email = s.email?.toLowerCase() || "";
        return name.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
      })
      // 2️⃣ Filter theo age
      .filter((s) => {
        if (ageFilter === "<=20") return s.age <= 20;
        if (ageFilter === "21-25") return s.age >= 21 && s.age <= 25;
        if (ageFilter === ">25") return s.age > 25;
        return true;
      })
      // 3️⃣ Map fallback avatar + đánh dấu có avatar
      .map((s) => ({
        ...s,
        avatar: s.avatar && s.avatar.trim() !== "" ? s.avatar : "/img/default-avatar.png",
        _hasAvatar: s.avatar && s.avatar.trim() !== ""
      }))
      // 4️⃣ Sort
      .sort((a, b) => {
        if (sort === "age-asc") return a.age - b.age;
        if (sort === "age-desc") return b.age - a.age;
        if (sort === "name-asc") return a.name.localeCompare(b.name);
        if (sort === "name-desc") return b.name.localeCompare(a.name);
        return 0;
      });
  }, [search, ageFilter, sort]);

  // 5️⃣ Lọc nếu bật hasAvatar
  const displayedStudents = hasAvatar
    ? filteredStudents.filter((s) => s._hasAvatar)
    : filteredStudents;

  return (
    <>
      <AppNavbar search={search} setSearch={setSearch} />
      <Container className="my-4">
        <h2>Student Management</h2>
        <p>Manage student list with filters and sorting</p>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Filters
            ageFilter={ageFilter}
            setAgeFilter={setAgeFilter}
            hasAvatar={hasAvatar}
            setHasAvatar={setHasAvatar}
          />
          <SortDropdown sort={sort} setSort={setSort} />
        </div>

        <StudentGrid students={displayedStudents} onView={setSelectedStudent} />

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

