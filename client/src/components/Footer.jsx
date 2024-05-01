import React from "react";
import { Container, Row, Col} from "react-bootstrap";

export default function Footer() {

  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col md={4} className="text-md-left text-center">
            <img
              src="images/Logo.jpg"
              alt="Mens Luxury"
              className="footer-logo"
            />
          </Col>
          <Col md={4} className="text-center">
            <p className="copyright">
              &copy; {new Date().getFullYear()} Mens Luxury.
              All rights reserved.
            </p>
          </Col>
          <Col md={4} className="text-md-right text-center">
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
