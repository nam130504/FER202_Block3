import { Navbar, Container, Nav } from "react-bootstrap";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">My Shop</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/favourites"><FaHeart /></Nav.Link>
          <Nav.Link as={Link} to="/cart"><FaShoppingCart /></Nav.Link>
          <Nav.Link as={Link} to="/login"><FaUser /></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
