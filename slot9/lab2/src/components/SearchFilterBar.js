import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SearchFilterBar({ genres, genre, setGenre, sort, setSort, query, setQuery }) {
  return (
    <div className="p-3 bg-white rounded shadow-sm mb-3">
      <Row className="g-2">
        <Col md={3}>
          <Form.Select value={genre} onChange={(e) => setGenre(e.target.value)}>
            {genres.map((g) => <option key={g}>{g}</option>)}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="none">Sort: None</option>
            <option value="asc">Duration ↑</option>
            <option value="desc">Duration ↓</option>
          </Form.Select>
        </Col>
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
}

SearchFilterBar.propTypes = {
  genres: PropTypes.array.isRequired,
  genre: PropTypes.string.isRequired,
  setGenre: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired
};
