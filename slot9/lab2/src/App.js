import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import RequestForm from './pages/RequestForm';

export default function App() {
  return (
    <>
      <AppNavbar />
      <div style={{ paddingTop: 70 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/request" element={<RequestForm />} />
        </Routes>
      </div>
    </>
  );
}
