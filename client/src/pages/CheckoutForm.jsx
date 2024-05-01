import React, { useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';

export default function CheckoutForm({ show, onClose, totalPrice, cartItems }) {
  const [loading, setLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  console.log(cartItems);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };




  const placeOrderHandler = async (event) => {
    event.preventDefault();

    const cartData = cartItems.map((item) => ({
      name: item.watch_name || item.tie_name || item.shoe_name || item.belt_name,
      price: item.watch_price || item.tie_price || item.shoe_price || item.belt_price,
      quantity: item.quantity
    }
  ));

    cartData.forEach(item => {
      console.log(item.quantity);
    });
   
    try {
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

  return (
    <div className={`checkout-sidebar ${show ? 'active' : ''}`}>
      <div className="overlay" onClick={onClose}></div>
      <div className="sidebar">
        <Container>
          <h2>Checkout</h2>
          <Form onSubmit={placeOrderHandler}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
            </Form.Group>
            <Form.Group controlId="formCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="Enter your card number"
                required
              />
            </Form.Group>
            <Form.Group controlId="formExpiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                required
              />
            </Form.Group>
            <Form.Group controlId="formCVV">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="Enter CVV"
                required
              />
            </Form.Group>
            <Button className="place-order-btn" variant="primary" type="submit">
              Place Order
            </Button>
          </Form>
          {paymentCompleted && (
            <Alert variant="success">
              Payment completed successfully!
            </Alert>
          )}
        </Container>
      </div>
    </div>
  );
};


