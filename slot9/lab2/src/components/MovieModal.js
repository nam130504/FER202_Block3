import { Modal, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function MovieModal({ show, onHide, movie }) {
  if (!movie) return null;
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {movie.poster && (
          <img
            src={movie.poster}
            alt={movie.title}
            className="img-fluid rounded mb-3"
          />
        )}
        <p>{movie.description}</p>
        <Badge bg="info" className="me-2">{movie.genre}</Badge>
        <small className="text-muted">
          {movie.year} · {movie.country} · {movie.duration}m
        </small>
      </Modal.Body>
    </Modal>
  );
}

MovieModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  movie: PropTypes.object
};
