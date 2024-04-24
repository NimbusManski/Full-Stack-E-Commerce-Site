import {
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="/images/Logo.jpg"
            alt="Logo"
            width="35"
            height="35"
            className="d-inline-block align-top"
          ></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mx-auto">
            <Nav.Link href="/all-items">Shop All</Nav.Link>
            <Nav.Link href="/brands">Brands</Nav.Link>
            <Nav.Link href="/profile">Cart</Nav.Link>
            <NavDropdown
              title="more"
              id="basic-nav-dropdown"
              className="ms-auto"
            >
              <NavDropdown.Item href="#action/3.1">Watches</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Ties</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Shoes</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Hats</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login">
              Profile
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
