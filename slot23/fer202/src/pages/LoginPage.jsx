import React, { useState } from "react";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";
import api from "../services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await api.get("/accounts");
      const account = data.find(
        acc =>
          acc.email === email &&
          acc.password === password &&
          acc.isActive === true
      );
      if (account) {
        alert("Login successful!");
        setError("");
      } else {
        setError("Invalid credentials or inactive account.");
      }
    } catch {
      setError("Server error.");
    }
  }

  return (
    <Container className="py-5">
      <Card className="mx-auto" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h3 className="mb-4">Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
