import NavBar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import './App.css';

export default function App() {
  return (
    <>
      <NavBar />
      <div className="container py-4">
        <AppRoutes />
      </div>
    </>
  );
}
