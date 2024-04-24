import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <Container fluid style={{ backgroundColor: "black", paddingTop: "50px", paddingBottom: "50px" }}>
        <h3 className="footer-header">Explore</h3>
      <Row style={{ textAlign: "center", gap: 40 }}>
        <div className="footer-link-wrapper">
          <Link to={"/about-us"} className="footer-link mx-2">About Us</Link>
        </div>
        <div className="footer-link-wrapper">
          <Link to={"/watches"} className="footer-link mx-2">All Watches</Link>
        </div>
        <div className="footer-link-wrapper">
          <Link to={"/shoes"} className="footer-link mx-2">All Shoes</Link>
        </div>
        <div className="footer-link-wrapper">
          <Link to={"/hats"} className="footer-link mx-2">All Hats</Link>
        </div>
        <div className="footer-link-wrapper">
          <Link to={"/ties"} className="footer-link mx-2">All Ties</Link>
        </div>
      </Row>
    </Container>
      );
}
