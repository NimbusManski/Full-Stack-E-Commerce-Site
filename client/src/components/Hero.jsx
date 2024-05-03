import { Container, Row, Col, Button } from "react-bootstrap";

export default function Hero() {
  return (
    <div className="hero">
      <Container className="header-section">
        <Row className="justify-content-start align-items-center vh-100">
          <Col md={8} className="text-left hero-col-custom">
            <h1 className="display-3">Discover</h1>
            <p className="lead">Timeless Luxury</p>
            <p>Explore our exquisite collection of luxury watches and accessories.</p>
            <div className="button-wrapper mt-3">
              <button href="#shop" className="btn-custom"><a href="#shop">Get Started</a></button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
