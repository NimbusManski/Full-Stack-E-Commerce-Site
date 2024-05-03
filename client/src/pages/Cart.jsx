import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { UserContext } from "../components/UserContext";
import Navigation from "../components/Navigation";
import { MdClose } from "react-icons/md";
import { loadStripe } from '@stripe/stripe-js';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0); 
  const { userInfo } = useContext(UserContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get('success');
  const cancel = queryParams.get('cancel');

 useEffect(() => {
    async function clearCart(userId) {
        try {
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/clear-cart/${userId}`, {
            method: "DELETE",
            credentials: "include",
          });
      
          console.log({"userId" : userId});
      
          if (!response.ok) {
            throw new Error("Failed to clear cart");
          } else {
            console.log("Cart cleared successfully");
          }
        } catch (error) {
          console.error("Error clearing cart:", error);
        }
      };
  
    if (userInfo && userInfo.id) {
      if (success) {
        alert("Payment complete!");
        clearCart(userInfo.id);
      } else if (cancel) {
        alert("Payment failed");
      }
    }
  }, [success, cancel, userInfo]);


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

      console.log(cartItems);

      const totalQuantity = cartItems.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
      setTotalQuantity(totalQuantity);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
 
  useEffect(() => {
    fetchCartItems();
  }, [userInfo]);
  

  const placeOrderHandler = async () => {
    const cartData = cartItems.map((item) => {
        let itemType;
        let itemName;
        let itemPrice;
    
        if (item.watch_brand) {
          itemType = "watch";
          itemName = item.watch_name;
          itemPrice = item.watch_price;
        } else if (item.tie_brand) {
          itemType = "tie";
          itemName = item.tie_name;
          itemPrice = item.tie_price;
        } else if (item.shoe_brand) {
          itemType = "shoe";
          itemName = item.shoe_name;
          itemPrice = item.shoe_price;
        } else if (item.belt_brand) {
          itemType = "belt";
          itemName = item.belt_name;
          itemPrice = item.belt_price;
        }
    
        return {
          itemType: itemType,
          name: itemName,
          price: itemPrice,
          quantity: item.quantity
        };
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
  };


  async function removeItemsHandler(cartIdNum) {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/remove-cart-item/${cartIdNum}`, {
        method: "DELETE",
        credentials: "include",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({ cartIdNum }),
      });

      console.log(cartIdNum)

      if (response.status === 200) {
        alert('Item removed');
        fetchCartItems(); 
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
        {cartItems.length === 0 && (
            <p>Your cart is empty...</p>
        )}
        <Row className="car-row-custom">
          {cartItems.map((item, index) => (
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

    </div>
  );
}




