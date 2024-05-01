import { useState,useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "../components/Navigation";
import Belt from "../models/Belt";
import { Link } from "react-router-dom";
import Explore from "../components/Explore";
import Footer from "../components/Footer";

export default function Belts() {

  const [beltData, setBeltData] = useState([]);

     useEffect(() => {
        async function fetchBelts() {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_SERVER_URL}/belts`,
              { method: "GET", credentials: "include" }
            );
    
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
    
            const beltData = await response.json();
            setBeltData(beltData);
            console.log(beltData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
    
        fetchBelts();
      }, [setBeltData]);


  return (
    <div className="belts-wrapper">
      <Navigation />
      <div className="belts-page-hero">
        <Container className="header-section">
          <Row className="justify-content-center align-items-center belts-row-custom">
            <Col md={8} className="text-center watch-page-hero-col-custom">
              <div className="lead-wrapper">
                <div className="button-wrapper mt-3"></div>
              </div>
            </Col>
          </Row>
        </Container>

        <section className="items">
          <Container className="text-center">
            <h1 className="belts-page-header">Belts</h1>
            <p>
              Embrace the pinnacle of luxury with our meticulously crafted
              shoes, where every step is a testament to elegance and refinement.
              Handcrafted from the finest materials and designed with
              unparalleled attention to detail, our luxury footwear exudes
              sophistication and timeless style. Elevate your wardrobe with
              shoes that not only exude opulence but also provide unparalleled
              comfort and durability, ensuring every stride is a statement of
              unparalleled taste and distinction.
            </p>
            <Row xs={1} sm={2} md={3} lg={4}>
              {beltData.map((belt, index) => (
                <Col
                  key={index}
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <Link className="watch-link" to={`/belt-details/${belt.id}`}>
                    <Belt image1={belt.image1}
                    brand={belt.brand}
                    name={belt.name}
                    description={belt.description}
                    price={belt.price}
                    />
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
          <Container className="text-center">
            <div className="belt-section">
              <div className="belt-section-overlay">
                <h2>Strap in Style</h2>
                <p>Your Luxury, Our Craftsmanship.</p>
              </div>
            </div>
          </Container>
        </section>
        <Explore />
        <Footer />
      </div>
    </div>
  );
}
