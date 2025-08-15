import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function RequestForm() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !genre) {
      setMsg('Please fill all fields');
      return;
    }
    setMsg(`Request submitted for movie: ${title} (${genre})`);
    setTitle('');
    setGenre('');
  };

  return (
    <div className="container mt-3" style={{ maxWidth: 600 }}>
      <h3>Movie Request Form</h3>
      {msg && <Alert variant="info">{msg}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Movie Title</Form.Label>
          <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Control value={genre} onChange={(e) => setGenre(e.target.value)} />
        </Form.Group>
        <Button type="submit">Submit Request</Button>
      </Form>
    </div>
  );
}
