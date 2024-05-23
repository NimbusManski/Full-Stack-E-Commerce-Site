import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <div>
      <Navigation />
      <div className="about-us">
        <section className="hero-section">
          <Container fluid>
            <Row className="h-100 align-items-center">
              <Col md={6}>
                <div className="hero-content text-white">
                  <h1>About Us</h1>
                  <p>
                    We are your destination for the finest luxury men's
                    accessories.
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div className="hero-image">
                  <img
                    src="/images/about-us-hero-img.jpeg"
                    alt="About Us"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="image-sections">
          <Container>
            <Row className="justify-content-md-center">
              <Col md={4}>
                <div className="image-wrapper">
                  <img
                    src="/images/about-us-section-img3.jpeg"
                    alt="Image 1"
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                  <div className="image-description">
                    <h3>Our Trustworthiness</h3>
                    <p>
                      With years of experience and thousands of satisfied
                      customers, we have earned the trust of our community by
                      consistently providing high-quality products and
                      exceptional service.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="image-wrapper">
                  <img
                    src="/images/about-us-section-img2.jpeg"
                    alt="Image 2"
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                  <div className="image-description">
                    <h3>Customer Satisfaction</h3>
                    <p>
                      Our dedication to customer satisfaction is unparalleled.
                      We go above and beyond to ensure that every customer has a
                      seamless shopping experience, from browsing our products
                      to post-purchase support.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="image-wrapper">
                  <img
                    src="/images/about-us-section-img.jpeg"
                    alt="Image 3"
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                  <div className="image-description">
                    <h3>Our Luxury Assortment</h3>
                    <p>
                      Explore our vast collection of luxury accessories,
                      meticulously curated to cater to every style and
                      preference. From classic timepieces to modern accessories,
                      we have something for everyone.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="trust-section">
          <Container>
            <Row className="align-items-center ">
              <Col md={6}>
                <div className="trust-content">
                  <h2>Why Choose Us?</h2>
                  <p>
                    We are committed to providing the highest quality products
                    and excellent customer service. Our store is trusted by
                    thousands of satisfied customers worldwide.
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div className="trust-icons">
                  <img src="/images/trusted-icon.jpg" alt="Trusted Icon 1" />
                  <img src="/images/trusted-icon2.jpg" alt="Trusted Icon 2" />
                  <img src="/images/trusted-icon3.jpg" alt="Trusted Icon 3" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="additional-section">
          <Container>
            <Row>
              <Col md={6} className="additional-section-image">
                <img
                  src="/images/about-us-mission-img.jpeg"
                  alt="Our Mission"
                />
              </Col>
              <Col md={6} className="additional-section-content">
                <h2>Our Mission</h2>
                <p>
                  Our mission is to provide luxury men's accessories of the
                  highest quality, crafted with precision and attention to
                  detail. We strive to exceed customer expectations and become
                  the go-to destination for discerning individuals seeking the
                  finest products.
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="additional-section">
          <Container>
            <Row>
              <Col md={6} className="additional-section-image">
                <img src="/images/about-us-values-img.jpeg" alt="Our Values" />
              </Col>
              <Col md={6} className="additional-section-content">
                <h2>Our Values</h2>
                <ul>
                  <li>Quality</li>
                  <li>Integrity</li>
                  <li>Customer Satisfaction</li>
                  <li>Innovation</li>
                  <li>Continuous Improvement</li>
                </ul>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <Footer />
    </div>
  );
}
