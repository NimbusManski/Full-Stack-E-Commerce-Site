import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Explore() {
    return (
        <Container fluid style={{ backgroundColor: "black", paddingTop: "50px", paddingBottom: "50px" }}>
        <h3 className="explore-header">Explore</h3>
      <Row style={{ textAlign: "center", gap: 40 }}>
        <div className="explore-link-wrapper">
          <Link to={"/about-us"} className="explore-link mx-2">About Us</Link>
        </div>
        <div className="explore-link-wrapper">
          <Link to={"/watches"} className="explore-link mx-2">All Watches</Link>
        </div>
        <div className="explore-link-wrapper">
          <Link to={"/shoes"} className="explore-link mx-2">All Shoes</Link>
        </div>
        <div className="explore-link-wrapper">
          <Link to={"/hats"} className="explore-link mx-2">All Hats</Link>
        </div>
        <div className="explore-link-wrapper">
          <Link to={"/ties"} className="explore-link mx-2">All Ties</Link>
        </div>
      </Row>
    </Container>
      );
}
