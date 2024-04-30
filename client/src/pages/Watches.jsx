import { useState, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
import Navigation from "../components/Navigation";
import Watch from "../models/Watch";
import { Link } from "react-router-dom";
import Explore from "../components/Explore";
import Footer from "../components/Footer";

export default function Watches() {
     const [watchData, setWatchData] = useState([]);

     useEffect(() => {
        async function fetchWatches() {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_SERVER_URL}/watches`,
              { method: "GET", credentials: "include" }
            );
    
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
    
            const watchData = await response.json();
            setWatchData(watchData);
            console.log(watchData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
    
        fetchWatches();
      }, [setWatchData]);


  return (
    <div className="watches-wrapper">
      <Navigation />
      <div className="watches-page-hero">
        <Container className="header-section">
          <Row className="justify-content-center align-items-center watches-row-custom">
            <Col md={8} className="text-center watches-page-hero-col-custom">
              <div className="lead-wrapper">
                <div className="button-wrapper mt-3"></div>
              </div>
            </Col>
          </Row>
        </Container>

        <section className="items">
          <Container className="text-center">
            <h1 className="watches-page-header">Watches</h1>
            <p>
              With thousands of pre-owned luxury watches from the best brands
              around the world, we are dedicated to bringing collectors and
              enthusiasts an unrivaled selection of timepieces. Our in-house
              team of Swiss-trained watchmakers, technicians, and refinishers
              are highly skilled and have a passion for quality, authenticity,
              and craftsmanship—so you never have to worry about compromising
              value or provenance. Explore our expansive selection of authentic
              pre-owned watches from top brands like Patek Philippe, Cartier,
              Breitling, and Omega. Or, discover something new designed by an
              independent watchmaker—we have exactly what you’ve been searching
              for.
            </p>
            <Row xs={1} sm={2} md={3} lg={4}>
              {watchData.map((watch, index) => (
                <Col
                  key={index}
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <Link className="watch-link" to={`/watch-details/${watch.id}`}>
                    <Watch image1={watch.image1}
                    brand={watch.brand}
                    name={watch.name}
                    description={watch.description}
                    price={watch.price}
                    />
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
          <Container className="text-center">
            <div className="watch-section">
              <div className="watch-section-overlay">
                <h2>Mens Luxury</h2>
                <p>A new era of accessories.</p>
              </div>
            </div>
            {/* <Row xs={1} sm={2} md={3} lg={4}>
              {itemsTwo.map((item, index) => (
                <Col
                  key={index}
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <Link to={""}>
                    <Item {...item} />
                  </Link>
                </Col>
              ))}
            </Row> */}
          </Container>
        </section>
        <Explore />
        <Footer />
      </div>
    </div>
  );
}
