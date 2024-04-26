import { Container, Row, Col } from "react-bootstrap";
import Navigation from "../components/Navigation";
import Item from "../components/Item";
import { Link } from "react-router-dom";
import Explore from "../components/Explore";
import Footer from "../components/Footer";

export default function Watches() {
  const itemsOne = [
    {
      maker: "some maker",
      imageUrl: "/images//watches/Nautilus-Moonphase.avif",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/watches/watch-2.avif",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/shoes/shoe-1.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/shoes/shoe-2.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/belts/belt-1.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/belts/belt-2.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/ties/tie-1.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/ties/tie-2.jpg",
      name: "some name",
      description: "some description",
      price: 32,
    },
    {
      maker: "some maker",
      imageUrl: "/images//watches/Nautilus-Moonphase.avif",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/watches/watch-2.avif",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/shoes/shoe-1.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/shoes/shoe-2.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },
  ];
  const itemsTwo = [
    {
      maker: "some maker",
      imageUrl: "/images//watches/Nautilus-Moonphase.avif",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/watches/watch-2.avif",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/shoes/shoe-1.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/shoes/shoe-2.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/belts/belt-1.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/belts/belt-2.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/ties/tie-1.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/ties/tie-2.jpg",
      name: "some name",
      description: "some description",
      price: 32,
    },
    {
      maker: "some maker",
      imageUrl: "/images//watches/Nautilus-Moonphase.avif",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/watches/watch-2.avif",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/shoes/shoe-1.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/shoes/shoe-2.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/belts/belt-1.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/belts/belt-2.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/ties/tie-1.webp",
      name: "some name",
      description: "some description",
      price: 32,
    },

    {
      maker: "some maker",
      imageUrl: "/images/ties/tie-2.jpg",
      name: "some name",
      description: "some description",
      price: 32,
    },
  ];

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
            <h1 className="watches-page-header">All Watches</h1>
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
              {itemsOne.map((item, index) => (
                <Col
                  key={index}
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <Link to={""}>
                    <Item {...item} />
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
            <Row xs={1} sm={2} md={3} lg={4}>
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
            </Row>
          </Container>
        </section>
        <Explore />
        <Footer />
      </div>
    </div>
  );
}
