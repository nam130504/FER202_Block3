import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Modal,
} from "react-bootstrap";
import PropTypes from "prop-types";
import ProfileWizard from "./ProfileWizard";

export default function AppNavbar({ search, setSearch }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#">Student Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Students</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
              {/* Link mở Modal */}
              <Nav.Link onClick={() => setShowModal(true)}>
                Build your Profile
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Quick search"
                className="me-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal hiển thị ProfileWizard */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Build Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfileWizard onClose={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
}

AppNavbar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};
