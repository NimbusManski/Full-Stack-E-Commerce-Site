import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import Navigation from "../components/Navigation";
import { UserContext } from "../components/UserContext";

export default function WatchDetails() {
  const [watchData, setWatchData] = useState([]);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    async function fetchWatchDetails() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/watch-details/${id}`,
          { method: "GET", credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const watchData = await response.json();
        setWatchData(watchData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchWatchDetails();
  }, [id]);

  const images = [
    watchData.image1,
    watchData.image2,
    watchData.image3,
    watchData.image4,
  ];

  console.log(userInfo);

  function addToCartHandler() {

  try { fetch(`${import.meta.env.VITE_SERVER_URL}/add-to-cart`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ itemType: "watch", itemId: watchData.id, userId: userInfo.id }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add item");
        }
        alert("Item added to cart");
        console.log("Item added");
      });} catch(err) {
        console.error("Error adding item:", err);
      }
  }

  return (
    <div className="details-wrapper d-flex align-items-center justify-content-center">
     <Navigation />
      <Container className="mt-4 details-container-custom">
        <Row>
          <Col xs={12} md={6}>
            <Carousel>
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`Slide ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col xs={12} md={6} className="d-flex align-items-center">
            <div className="details-info">
              <h5>${watchData.price}</h5>
              <h2>{watchData.name}</h2>
              <h4>{watchData.brand}</h4>
              <p>{watchData.description}</p>
              <Button className="add-to-cart-btn" onClick={addToCartHandler}>
                Add to Cart
              </Button>
              {/* <Link to={`/watches/${watchData.brand}`}>More from this brand</Link> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
