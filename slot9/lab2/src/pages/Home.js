import { useState, useMemo } from 'react';
import { Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import { movies, allGenres } from '../data/movies';
import { loadFavs, saveFavs } from '../utils/storage';
import HeroCarousel from '../components/HeroCarousel';
import SearchFilterBar from '../components/SearchFilterBar';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

export default function Home() {
  const [genre, setGenre] = useState('All');
  const [sort, setSort] = useState('none');
  const [query, setQuery] = useState('');
  const [favs, setFavs] = useState(loadFavs());
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState('');

  const filtered = useMemo(() => {
    let list = [...movies];
    if (genre !== 'All') {
      list = list.filter(m => m.genre === genre);
    }
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      );
    }
    if (sort === 'asc') list.sort((a, b) => a.duration - b.duration);
    if (sort === 'desc') list.sort((a, b) => b.duration - a.duration);
    return list;
  }, [genre, sort, query]);

  const toggleFav = (id) => {
    const newFavs = favs.includes(id)
      ? favs.filter(f => f !== id)
      : [...favs, id];
    setFavs(newFavs);
    saveFavs(newFavs);
    setToast(newFavs.includes(id) ? '❤️ Added to favourites' : '💔 Removed from favourites');
  };

  return (
    <>
      {/* Banner tự chạy */}
      <HeroCarousel interval={3000} pause={false} />

      <div className="container mt-3">
        <SearchFilterBar
          genres={allGenres}
          genre={genre}
          setGenre={setGenre}
          sort={sort}
          setSort={setSort}
          query={query}
          setQuery={setQuery}
        />
        <Row xs={1} md={3} className="g-3">
          {filtered.map(movie => (
            <Col key={movie.id}>
              <MovieCard
                movie={movie}
                onView={() => setSelected(movie)}
                onFav={() => toggleFav(movie.id)}
                isFaved={favs.includes(movie.id)}
              />
            </Col>
          ))}
        </Row>
      </div>

      <MovieModal
        show={!!selected}
        onHide={() => setSelected(null)}
        movie={selected}
      />

      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setToast('')}
          show={!!toast}
          delay={1500}
          autohide
        >
          <Toast.Body className="text-white">{toast}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
