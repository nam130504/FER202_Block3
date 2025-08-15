import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function AppNavbar() {
  return (
    <Navbar expand="lg" fixed="top" className="navbar-blur">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Movie Explorer</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>Free Movies</Nav.Link>
            <Nav.Link as={NavLink} to="/favourites">My Favourite Movies</Nav.Link>
            <Nav.Link as={NavLink} to="/request">Movie Request Form</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
