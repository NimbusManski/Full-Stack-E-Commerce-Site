import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navigation from "../components/Navigation";
import { UserContext } from "../components/UserContext";

export default function BeltDetails() {
  const [beltData, setBeltData] = useState([]);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    async function fetchBeltDetails() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/belt-details/${id}`,
          { method: "GET", credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const beltData = await response.json();
        setBeltData(beltData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchBeltDetails();
  }, [id]);

  const images = [
    beltData.image1,
    beltData.image2
  ];

  function addToCartHandler() {
    try {
      fetch(`${import.meta.env.VITE_SERVER_URL}/add-to-cart`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ itemType: "belt", itemId: beltData.id, userId: userInfo.id }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add item");
        }
        alert("Item added to cart");
        console.log("Item added");
      });
    } catch (err) {
      console.error("Error adding item:", err);
    }
  }

  return (
    <div className="details-wrapper d-flex align-items-center justify-content-center">
      <Navigation/>
      <Container className="mt-4 details-container-custom">
        <Row>
          <Col xs={12} md={6} className="text-center">
            <img
              className="details-image"
              src={images[0]}
              alt="Belt"
            />
          </Col>
          <Col xs={12} md={6} className="d-flex align-items-center">
            <div className="details-info">
              <h5>${beltData.price}</h5>
              <h2>{beltData.name}</h2>
              <h4>{beltData.brand}</h4>
              <p>{beltData.description}</p>
              <p>{beltData.id}</p>
              <Button className="add-to-cart-btn" onClick={addToCartHandler}>
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
