import { useState, useEffect, useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Navigation() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/profile`, {
          credentials: "include",
        });
  
        if (response.status === 401) {
          navigate("/login");
          return;
        }
  
        const userInfo = await response.json();
        setUserInfo(userInfo);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          if (userInfo === undefined) {
            navigate("/login");
          } else {
            alert("Session has expired");
            navigate("/login");
          }
        }

      }
    };
  
    if (Object.keys(userInfo).length === 0) {
      fetchData();
    }
  }, [setUserInfo]);

  

  async function logout() {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
  
      setUserInfo(undefined);
      window.localStorage.clear(); 
      window.sessionStorage.clear();
      localStorage.removeItem("token");
      navigate("/login");
      window.location.reload();
    } catch (err) {
      console.error("Error logging out:", err);
    }
  }

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          />
        </Navbar.Brand>
        <span>Logged in as {userInfo.username} |   </span>
            <NavDropdown title="  Shop" id="basic-nav-dropdown" className="navigation-dropdown">
              <NavDropdown.Item href="/watches">Watches</NavDropdown.Item>
              <NavDropdown.Item href="/ties">Ties</NavDropdown.Item>
              <NavDropdown.Item href="/shoes">Shoes</NavDropdown.Item>
              <NavDropdown.Item href="/belts">Belts</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link className="px-2" href="/about-us">| About Us</Nav.Link> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/cart">View Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
