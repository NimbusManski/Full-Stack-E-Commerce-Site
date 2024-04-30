import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { UserContext } from '../components/UserContext';


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/cart-items`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'User-Id': userInfo.id
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const cartItems = await response.json();
        setCartItems(cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }

    fetchCartItems();
  }, [userInfo]);

  return (
    <div>
      <Navigation />
      <Container className="mt-4 cart-container-custom">
        <h1>Cart</h1>
        <Row className="car-row-custom">
          {cartItems.map((item) => (
            <Col key={item.cart_item_id} xs={12} md={6} lg={4}>
              <div className="cart-item">
                <img className="cart-item-image" src={item.watch_image1 || item.tie_image1 || item.shoe_image1 || item.belt_image1} alt={item.watch_name || item.tie_name || item.shoe_name || item.belt_name} />
                <div className="cart-item-details">
                  <h2>{item.watch_name || item.tie_name || item.shoe_name || item.belt_name}</h2>
                  <p>Price: ${item.watch_price || item.tie_price || item.shoe_price || item.belt_price}</p>
                  <Button variant="danger">Remove</Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Cart;
