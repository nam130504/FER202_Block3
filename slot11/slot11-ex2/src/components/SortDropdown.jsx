// src/components/SortDropdown.jsx
import React from "react";
import { Form } from "react-bootstrap";

export default function SortDropdown({ sort, setSort }) {
  return (
    <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
      <option value="">Sort by...</option>
      <option value="age-asc">Age ↑</option>
      <option value="age-desc">Age ↓</option>
      <option value="name-asc">Name A→Z</option>
      <option value="name-desc">Name Z→A</option>
    </Form.Select>
  );
}
