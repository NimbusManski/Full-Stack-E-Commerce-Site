import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import Explore from "../components/Explore";
import Footer from "../components/Footer";
import Shoe from "../models/Shoe";

export default function Shoes() {
  const [shoeData, setShoeData] = useState([]);


  useEffect(() => {
     async function fetchShoes() {
       try {
         const response = await fetch(
           `${import.meta.env.VITE_SERVER_URL}/shoes`,
           { method: "GET", credentials: "include" }
         );
 
         if (!response.ok) {
           throw new Error("Failed to fetch data");
         }
 
         const shoeData = await response.json();
         setShoeData(shoeData);
         console.log(shoeData);
       } catch (error) {
         console.error("Error fetching data:", error);
       }
     }
 
     fetchShoes();
   }, [setShoeData]);

  
  return (
    <div className="shoes-wrapper">
      <Navigation />
      <div className="shoes-page-hero">
        <Container className="header-section">
          <Row className="justify-content-center align-items-center shoes-row-custom">
            <Col md={8} className="text-center watch-page-hero-col-custom">
              <div className="lead-wrapper">
                <div className="button-wrapper mt-3"></div>
              </div>
            </Col>
          </Row>
        </Container>

        <section className="items">
          <Container className="text-center">
            <h1 className="shoes-page-header">Shoes</h1>
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
              {shoeData.map((shoe, index) => (
                <Col
                  key={index}
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                   <Link className="details-link" to={`/shoe-details/${shoe.id}`}>
                    <Shoe image1={shoe.image1}
                    brand={shoe.brand}
                    name={shoe.name}
                    description={shoe.description}
                    price={shoe.price}
                    />
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
          <Container className="text-center">
            <div className="shoe-section">
              <div className="shoe-section-overlay">
                <h2>Step into Opulence</h2>
                <p> Where Luxury Meets Comfort and Style.</p>
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
