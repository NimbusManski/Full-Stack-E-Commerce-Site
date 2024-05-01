import { useState, useEffect, useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Navigation() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [cartNumber, setCartNumber] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

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
        credentials: "include",
      });

      setUserInfo({});
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : "navbar-custom"}>
      <Container>
        <Navbar.Brand className="mr-auto" href="/">
          <img
            src="/images/Logo.jpg"
            alt="Logo"
            width="35"
            height="35"
            className="d-inline-block align-top"
          ></img>
        </Navbar.Brand>
        <span>Logged in as {userInfo.username}  |  </span>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/brands">Brands</Nav.Link>
            <Nav.Link href="/all-items">Shop All</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/cart">View Cart  {cartNumber > 0 && (cartNumber)}</Nav.Link>
            
            <NavDropdown
              title="more"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/watches">Watches</NavDropdown.Item>
              <NavDropdown.Item href="/ties">Ties</NavDropdown.Item>
              <NavDropdown.Item href="/shoes">Shoes</NavDropdown.Item>
              <NavDropdown.Item href="/belts">Belts</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="" onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
}
