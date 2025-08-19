// src/components/Filters.jsx
import React from "react";
import { Form } from "react-bootstrap";

export default function Filters({ ageFilter, setAgeFilter, hasAvatar, setHasAvatar }) {
  return (
    <Form className="my-3">
      <Form.Group className="mb-2">
        <Form.Label>Age Range</Form.Label>
        <Form.Select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
          <option value="">All</option>
          <option value="<=20">≤ 20</option>
          <option value="21-25">21 – 25</option>
          <option value=">25">&gt; 25</option>
        </Form.Select>
      </Form.Group>
      <Form.Check
        type="checkbox"
        label="Has avatar"
        checked={hasAvatar}
        onChange={(e) => setHasAvatar(e.target.checked)}
      />
    </Form>
  );
}
