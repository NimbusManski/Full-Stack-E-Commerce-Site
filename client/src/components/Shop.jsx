import { Container, Row, Col } from "react-bootstrap";
import Item from "./Item";
import { Link } from "react-router-dom";

export default function Shop() {
  const items = [
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
    <section className="items">
      <Container className="text-center">
        <h2 className="shop-header">Crafted for Elegance, Tailored for You</h2>
        <Row xs={1} sm={2} md={3} lg={4}>
          {items.map((item, index) => (
            <Col key={index} style={{ marginBottom: "20px", marginTop: "20px" }}>
              <Link to={''}>
                <Item {...item} />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
