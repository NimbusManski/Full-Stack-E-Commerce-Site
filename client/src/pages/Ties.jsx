import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import Explore from "../components/Explore";
import Footer from "../components/Footer";
import Tie from "../models/Tie";

export default function Ties() {
  const [tieData, setTieData] = useState([]);

     useEffect(() => {
        async function fetchTies() {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_SERVER_URL}/ties`,
              { method: "GET", credentials: "include" }
            );
    
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
    
            const tieData = await response.json();
            setTieData(tieData);
            console.log(tieData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
    
        fetchTies();
      }, [setTieData]);


  return (
    <div className="ties-wrapper">
      <Navigation />
      <div className="ties-page-hero">
        <Container className="header-section">
          <Row className="justify-content-center align-items-center ties-row-custom">
            <Col md={8} className="text-center tie-page-hero-col-custom">
              <div className="lead-wrapper">
                <div className="button-wrapper mt-3"></div>
              </div>
            </Col>
          </Row>
        </Container>

        <section className="items">
          <Container className="text-center">
            <h1 className="ties-page-header">Ties</h1>
            <p>
              Indulge in the epitome of sophistication with our luxury ties
              collection. Crafted with meticulous attention to detail and using
              only the finest materials, each tie exudes timeless elegance and
              unparalleled quality. Elevate your attire effortlessly, whether
              it's for a special occasion or to make a statement in the
              boardroom. With our commitment to exquisite craftsmanship and
              impeccable style, buying from us ensures not just a tie, but a
              symbol of refined taste and distinction that will endure for
              generations.
            </p>
            <Row xs={1} sm={2} md={3} lg={4}>
              {tieData.map((tie, index) => (
                <Col
                  key={index}
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                   <Link className="details-link" to={`/tie-details/${tie.id}`}>
                    <Tie image1={tie.image1}
                    brand={tie.brand}
                    name={tie.name}
                    description={tie.description}
                    price={tie.price}
                    />
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
          <Container className="text-center">
            <div className="tie-section">
              <div className="tie-section-overlay">
                <h2>Exquisite Elegance</h2>
                <p> Tied Together with Luxury.</p>
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
