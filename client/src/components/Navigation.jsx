import { useState, useEffect, useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Navigation() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/profile`,
        {
          method: "GET",
          credentials: "include",
        }
      ).then((response) => {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
          console.log(userInfo);
        });
        if (response.status === 401) {
          alert("Session has expired");
          navigate("/login");
        }
      });
    }

    console.log(document.cookie);

    fetchUserData();
  }, [setUserInfo]);

   function logout() {
    try {
     fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
        method: "POST",
        credentials: "include"
      });

      setUserInfo({});
      navigate("/login");

    } catch (err) {
      console.log(err);
    }
  }

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
              <NavDropdown.Item href="#action/3.3">Belts</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login">Profile</NavDropdown.Item>
              <NavDropdown.Item href="" onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
