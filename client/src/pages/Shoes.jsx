import { Container, Row, Col } from "react-bootstrap";
import Navigation from "../components/Navigation";
import Item from "../models/Item";
import { Link } from "react-router-dom";
import Explore from "../components/Explore";
import Footer from "../components/Footer";

export default function Shoes() {
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
            <div className="shoe-section">
              <div className="shoe-section-overlay">
                <h2>Step into Opulence</h2>
                <p> Where Luxury Meets Comfort and Style.</p>
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
