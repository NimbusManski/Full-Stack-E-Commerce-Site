require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const stripe = require('stripe')('sk_test_51PBMSrFURpMDh2V89nx43jc8EAbxQ2dZVcxpH698QHjdzqqPkKSiDJ2jKwyuBxLdyL2qCPLDuhewtL9EzcRiPkRn00YseOHKUc');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use("/uploads", express.static(__dirname + "/uploads"));

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.post("/register", (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    const hashedPass = bcrypt.hashSync(password, salt);

    const q = "SELECT * FROM luxury_store.users WHERE username = ?";

    db.query(q, [username], (err, data) => {
      if (err) {
        res.status(501).json({ message: "Error creating user" });
      }
      if (data.length > 0) {
        res.status(409).json({ message: "User already exists" });
      } else {
        const q =
          "INSERT INTO luxury_store.users (`username`, `password`) VALUES (?, ?)";

        db.query(q, [username, hashedPass], (err, data) => {
          if (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
          } else {
            res.status(201).json({ username, hashedPass });
          }
        });
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    const q = "SELECT * FROM luxury_store.users WHERE username = ?";
    db.query(q, [username], (err, data) => {
      if (err) {
        res.status(501).json({ message: "Error creating user" });
      }
      if (data.length === 1) {
        const { id, username, password: storedPass } = data[0];
        const passwordMatch = bcrypt.compare(password, storedPass);
        if (passwordMatch) {
          jwt.sign(
            {
              id,
              username,
            },
            secret,
            {
              expiresIn: "24H",
            },
            (err, token) => {
              if (err) {
                console.log(err);
              } else {
                res.cookie("token", token).json({ id, username });
              }
            }
          );
        }
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/profile", (req, res) => {
  try {
    const { token } = req.cookies;

    jwt.verify(token, secret, {}, (err, info) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          res.status(401).json({ message: "Token has expired" });
        } else if (err.name === "JsonWebTokenError") {
          res.status(401).json({ message: "Invalid token" });
        } else {
          res.status(500).json({ message: "Internal server error" });
        }
      } else {
        res.json(info);
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/watches", (req, res) => {
  try {
    const q = "SELECT * FROM luxury_store.watches ORDER BY watches.id DESC";

    db.query(q, (err, data) => {
      if (err) {
        res.json({ message: "Error fetching watches" });
      } else {
        return res.json(data);
      }

      console.log(data);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/watch-details/:id", (req, res) => {
  try {
    const { id } = req.params;

    const q = "SELECT * FROM luxury_store.watches WHERE id = ?";

    db.query(q, [id], (err, data) => {
      console.log(data);

      if (err) {
        console.log(err);
      } else if (data.length === 0) {
        res.status(404).json({ message: "Watch not found" });
      } else {
        return res.json(data[0]);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/ties", (req, res) => {
  try {
    const q = "SELECT * FROM luxury_store.ties ORDER BY ties.id DESC";

    db.query(q, (err, data) => {
      if (err) {
        res.json({ message: "Error fetching ties" });
      } else {
        return res.json(data);
      }

      console.log(data);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/tie-details/:id", (req, res) => {
  try {
    const { id } = req.params;

    const q = "SELECT * FROM luxury_store.ties WHERE id = ?";

    db.query(q, [id], (err, data) => {
      console.log(data);

      if (err) {
        console.log(err);
      } else if (data.length === 0) {
        res.status(404).json({ message: "Tie not found" });
      } else {
        return res.json(data[0]);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/belts", (req, res) => {
  try {
    const q = "SELECT * FROM luxury_store.belts ORDER BY belts.id DESC";

    db.query(q, (err, data) => {
      if (err) {
        res.json({ message: "Error fetching belts" });
      } else {
        return res.json(data);
      }

      console.log(data);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/belt-details/:id", (req, res) => {
  try {
    const { id } = req.params;

    const q = "SELECT * FROM luxury_store.belts WHERE id = ?";

    db.query(q, [id], (err, data) => {
      console.log(data);

      if (err) {
        console.log(err);
      } else if (data.length === 0) {
        res.status(404).json({ message: "Belt not found" });
      } else {
        return res.json(data[0]);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/shoes", (req, res) => {
  try {
    const q = "SELECT * FROM luxury_store.ties ORDER BY shoes.id DESC";

    db.query(q, (err, data) => {
      if (err) {
        res.json({ message: "Error fetching shoes" });
      } else {
        return res.json(data);
      }

      console.log(data);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/shoe-details/:id", (req, res) => {
  try {
    const { id } = req.params;

    const q = "SELECT * FROM luxury_store.shoes WHERE id = ?";

    db.query(q, [id], (err, data) => {
      console.log(data);

      if (err) {
        console.log(err);
      } else if (data.length === 0) {
        res.status(404).json({ message: "Shoe not found" });
      } else {
        return res.json(data[0]);
      }
    });
  } catch (err) {
    console.log(err);
  }
});


app.post("/add-to-cart", (req, res) => {
  try {
    const { userId, watchId } = req.body;

    // Check if the item already exists in the cart
    const selectQuery = "SELECT * FROM cart WHERE user_id = ? AND watch_id = ?";
    db.query(selectQuery, [userId, watchId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.length === 0) {
        // If the item doesn't exist, insert a new row with quantity 1
        const insertQuery = "INSERT INTO cart (user_id, watch_id, quantity) VALUES (?, ?, 1)";
        db.query(insertQuery, [userId, watchId], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
          }
          res.status(200).json({ message: "Item added to cart" });
        });
      } else {
        // If the item already exists, increment its quantity
        const updateQuery = "UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND watch_id = ?";
        db.query(updateQuery, [userId, watchId], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
          }
          res.status(200).json({ message: "Item quantity incremented in cart" });
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/cart-items", (req, res) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, secret);

    const userId = decoded.id;

    console.log(userId);

    const q = `
  SELECT
    c.id AS cart_item_id,
    c.quantity,
    w.id AS watch_id,
    w.brand AS watch_brand,
    w.name AS watch_name,
    w.description AS watch_description,
    w.price AS watch_price,
    w.image1 AS watch_image1,
    t.id AS tie_id,
    t.brand AS tie_brand,
    t.name AS tie_name,
    t.description AS tie_description,
    t.price AS tie_price,
    t.image1 AS tie_image1,
    s.id AS shoe_id,
    s.brand AS shoe_brand,
    s.name AS shoe_name,
    s.description AS shoe_description,
    s.price AS shoe_price,
    s.image1 AS shoe_image1,
    b.id AS belt_id,
    b.brand AS belt_brand,
    b.name AS belt_name,
    b.description AS belt_description,
    b.price AS belt_price,
    b.image1 AS belt_image1
  FROM
    luxury_store.cart AS c
    LEFT JOIN luxury_store.watches AS w ON c.watch_id = w.id
    LEFT JOIN luxury_store.ties AS t ON c.tie_id = t.id
    LEFT JOIN luxury_store.shoes AS s ON c.shoe_id = s.id
    LEFT JOIN luxury_store.belts AS b ON c.belt_id = b.id
  WHERE
    c.user_id = ?
  `;

    db.query(q, [userId], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      console.log("Cart items:", data);

      res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/remove-cart-item/:id", (req, res) => {
 try {const { itemId } = req.body;

  const q = "DELETE FROM luxury_store.cart WHERE id = ?";

  db.query(q, [itemId], (err, data) => {
    if(err) {
      res.status(500).json({message: "Internal server error"});
      console.log(err);
    }

    res.status(200).json(data);
  })
} catch(err) {
  console.log(err);
}});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body;

    // Create an array to store line items
    const lineItems = [];

    // Iterate over each item in the cart
    cart.forEach((item) => {
      // Construct line item for each item in the cart
      const lineItem = {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Convert price to cents if it's in dollars
        },
        quantity: item.quantity, // Include quantity for each item
      };
      console.log(item.quantity, item.name, item.price);

      // Push the line item to the lineItems array
      lineItems.push(lineItem);
    });

    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/cart?success=true', // Redirect to cart page with success parameter
  cancel_url: 'http://localhost:5173/cart?cancel=true',  
    });

    // Return the session ID to the client
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});


app.post("/logout", (req, res) => {
  res.clearCookie("token");
});

app.listen(process.env.PORT, (req, res) => {
  console.log("Backend running");
});
