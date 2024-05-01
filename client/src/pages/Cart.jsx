import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Offcanvas } from "react-bootstrap";
import { UserContext } from "../components/UserContext";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CheckoutForm from "./CheckoutForm";
import { MdClose } from "react-icons/md";
import { loadStripe } from '@stripe/stripe-js';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { userInfo } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get('success');
  const cancel = queryParams.get('cancel');
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    if (success) {
      alert("Payment complete!")
    }
    if (cancel) {
      alert("Payment failed");
    }
  }, [success, cancel]);


  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/cart-items`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const cartItems = await response.json();
      setCartItems(cartItems);

      const orderTotal = cartItems.reduce((acc, item) => {
        return (
          acc +
          (item.watch_price ||
            item.tie_price ||
            item.shoe_price ||
            item.belt_price) * item.quantity
        );
      }, 0);

      setTotalPrice(orderTotal);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userInfo]);

  const getUniqueItems = (items) => {
    const uniqueItems = {};
    items.forEach((item) => {
      const name =
        item.watch_name || item.tie_name || item.shoe_name || item.belt_name;
      if (!uniqueItems[name]) {
        uniqueItems[name] = item;
      }
    });
    return Object.values(uniqueItems);
  };

  const placeOrderHandler = async () => {


    const cartData = cartItems.map((item) => ({
      name: item.watch_name || item.tie_name || item.shoe_name || item.belt_name,
      price: item.watch_price || item.tie_price || item.shoe_price || item.belt_price,
      quantity: item.quantity
    }
  ));

    cartData.forEach(item => {
      console.log(item.quantity);
    });
    // Call your backend API to create a payment intent
    try {
      // Send payment information to your backend
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodType: "card",
          currency: 'usd',
          cart: cartData,
        }),

      });

      const data = await response.json();

      console.log(data.sessionId);

      // Call Stripe.js to handle the payment
      const stripe = await loadStripe("pk_test_51PBMSrFURpMDh2V8iNXUfd0YkzM2xKGttgdqQxc96qqNrcxdlfBDH1Rf0QFVsc328ibuIbKetBcqyTyKDCohDcON00e9YCqlY7");
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

     

      if (error) {
        console.error(error);
      }

    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  async function removeItemsHandler(itemId) {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/remove-cart-item/${itemId}`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({ itemId }),
      });

      console.log(itemId)

      if (response.status === 200) {
        alert('Item removed');
        // Optionally, update the cart items state or perform any other action
        fetchCartItems(); // Refresh cart items after removal
      }
    } catch(err) {
        console.log(err)
    }
  }

  return (
    <div className="cart-wrapper">
      <Navigation />
      <Container className="mt-4 cart-container-custom">
        <h1>Cart</h1>
        <Row className="car-row-custom">
          {getUniqueItems(cartItems).map((item, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <div className="cart-item">
                <img
                  className="cart-item-image"
                  src={
                    item.watch_image1 ||
                    item.tie_image1 ||
                    item.shoe_image1 ||
                    item.belt_image1
                  }
                  alt={
                    item.watch_name ||
                    item.tie_name ||
                    item.shoe_name ||
                    item.belt_name
                  }
                />
                <div className="cart-item-details">
                  <h4>
                    {item.watch_name ||
                      item.tie_name ||
                      item.shoe_name ||
                      item.belt_name}
                  </h4>
                  <h6>
                    {item.watch_brand ||
                      item.tie_brand ||
                      item.shoe_brand ||
                      item.belt_brand}
                  </h6>
                  <p>
                    Price: $
                    {item.watch_price ||
                      item.tie_price ||
                      item.shoe_price ||
                      item.belt_price}{" "}
                    {item.quantity > 1 && ` (${item.quantity})`}
                  </p>
                  <Button variant="danger">
                    <MdClose onClick={() => removeItemsHandler(item.cart_item_id)} />
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <div className="checkout-btn-wrapper">
        <Button variant="primary checkout-btn" onClick={() => placeOrderHandler()}>
          Checkout
        </Button>
      </div>
      {/* Checkout Offcanvas */}
      <Offcanvas
        className="off-canvas"
        show={show}
        onHide={() => setShow(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <CheckoutForm totalPrice={totalPrice} cartItems={cartItems} />
        </Offcanvas.Body>
      </Offcanvas>
      <Footer />
    </div>
  );
}
