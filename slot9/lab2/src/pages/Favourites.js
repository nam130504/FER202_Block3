import { Row, Col, Alert } from 'react-bootstrap';
import { movies } from '../data/movies';
import { loadFavs, saveFavs } from '../utils/storage';
import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

export default function Favourites() {
  const [favs, setFavs] = useState(loadFavs());
  const [selected, setSelected] = useState(null);

  const favMovies = movies.filter(m => favs.includes(m.id));

  const removeFav = (id) => {
    const newFavs = favs.filter(f => f !== id);
    setFavs(newFavs);
    saveFavs(newFavs);
  };

  if (favMovies.length === 0) {
    return <Alert variant="info" className="m-3">No favourites yet.</Alert>;
  }

  return (
    <div className="container mt-3">
      <Row xs={1} md={3} className="g-3">
        {favMovies.map(movie => (
          <Col key={movie.id}>
            <MovieCard
              movie={movie}
              onView={() => setSelected(movie)}
              onFav={() => removeFav(movie.id)}
              isFaved={true}
            />
          </Col>
        ))}
      </Row>
      <MovieModal show={!!selected} onHide={() => setSelected(null)} movie={selected} />
    </div>
  );
}
