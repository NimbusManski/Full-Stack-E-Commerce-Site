import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Item from "../models/Item";
import { Link } from "react-router-dom";

export default function Shop() {
 const [bestSellers, setBestSellers] = useState([])

  useEffect(() => {
    async function fetchBestSellers() {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/best-sellers`, {
        method: "GET",
        headers: {"Content-Type" : "application/json"},
      })

      const bestSellers = await response.json();
      setBestSellers(bestSellers);
      console.log(bestSellers)
    }

    fetchBestSellers()
  }, [])

  return (
    <section className="items" id="shop">
      <Container className="text-center">
        <h2 className="shop-header" >Best Sellers</h2>
        <Row xs={1} sm={2} md={3} lg={4}>
          {bestSellers.map((item, index) => (
            <Col key={index} className="item-col">
              <Link className="details-link" to={`/${item.type}-details/${item.id}`}>
                <Item
                  image={item.image}
                  brand={item.brand}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
