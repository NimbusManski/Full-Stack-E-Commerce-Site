require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: 'https://full-stack-e-commerce-site.onrender.com',
methods: ['GET', 'POST', 'PUT', 'DELETE'],
allowedHeaders: ['content-type', 'Authorization'], }));
app.use("/uploads", express.static(__dirname + "/uploads"));

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;
const blackList = [];

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

    const q = "SELECT * FROM bjyigszlcnclqmgyhmui.users WHERE username = ?";

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

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const q = "SELECT * FROM bjyigszlcnclqmgyhmui.users WHERE username = ?";
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
              expiresIn: 10,
            },
            (err, token) => {
              if (err) {
                console.log(err);
              } else {
                res.cookie("token", token, { 
                  secure: true, 
                  sameSite: 'none' 
                }).json({ id, username });
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

    if(blackList.includes(token)) {
      return res.status(401).json({message: "Token blacklisted"})
    }

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
      console.log(blackList + 'from profile');

    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/best-sellers",async (req, res) => {
  try {

   const q = "SELECT * FROM bjyigszlcnclqmgyhmui.best_sellers ORDER BY RAND()"

   db.query(q, (err, data) => {
    if(err) {
      console.log(err);
      res.status(500).json({ message: "Error fetching best sellers"})
    } else {
      res.status(200).json(data);
    }

   })

  } catch(err) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(err)
  }
})

app.get("/watches", (req, res) => {
  try {
    const q = "SELECT * FROM bjyigszlcnclqmgyhmui.watches ORDER BY watches.id DESC";

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

    const q = "SELECT * FROM bjyigszlcnclqmgyhmui.watches WHERE id = ?";

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
    const q = "SELECT * FROM bjyigszlcnclqmgyhmui.ties ORDER BY ties.id DESC";

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

    const q = "SELECT * FROM bjyigszlcnclqmgyhmui.ties WHERE id = ?";

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
    const q = "SELECT * FROM bjyigszlcnclqmgyhmui.belts ORDER BY belts.id DESC";

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

    const q = "SELECT * FROM bjyigszlcnclqmgyhmui.belts WHERE id = ?";

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
    const q = "SELECT * FROM bjyigszlcnclqmgyhmui.shoes ORDER BY shoes.id DESC";

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

    const q = "SELECT * FROM bjyigszlcnclqmgyhmui.shoes WHERE id = ?";

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
    const { userId, itemId, itemType } = req.body;

    const selectQuery = "SELECT * FROM cart WHERE user_id = ? AND item_id = ? AND item_type = ?";
    db.query(selectQuery, [userId, itemId, itemType], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.length === 0) {
        const insertQuery =
          "INSERT INTO cart (user_id, item_id, item_type, quantity) VALUES (?, ?, ?, 1)";
        db.query(insertQuery, [userId, itemId, itemType], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
          }
          res.status(200).json({ message: "Item added to cart" });
        });
      } else {
        const updateQuery =
          "UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND item_id = ? AND item_type = ?";
        db.query(updateQuery, [userId, itemId, itemType], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
          }
          res
            .status(200)
            .json({ message: "Item quantity incremented in cart" });
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
  bjyigszlcnclqmgyhmui.cart AS c
  LEFT JOIN bjyigszlcnclqmgyhmui.watches AS w ON c.item_id = w.id AND c.item_type = 'watch'
  LEFT JOIN bjyigszlcnclqmgyhmui.ties AS t ON c.item_id = t.id AND c.item_type = 'tie'
  LEFT JOIN bjyigszlcnclqmgyhmui.shoes AS s ON c.item_id = s.id AND c.item_type = 'shoe'
  LEFT JOIN bjyigszlcnclqmgyhmui.belts AS b ON c.item_id = b.id AND c.item_type = 'belt'
WHERE
  c.user_id = 2
  `;

    db.query(q, [userId], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // console.log("Cart items:", data);

      res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/remove-cart-item/:cartIdNum", (req, res) => {
  try {
    const{ cartIdNum }= req.body;

    const q = "DELETE FROM bjyigszlcnclqmgyhmui.cart WHERE id = ?";

    db.query(q, [cartIdNum], (err, data) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log(err);
      }

      // console.log(data);

      res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/clear-cart/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const q = "DELETE FROM luxury_store.cart WHERE user_id = ?";

    db.query(q, [userId], (err, data) => {
      if (err) {
        console.error("Error clearing cart:", err);
        return res.status(500).json({ message: "Failed to clear cart" });
      }
      console.log(data);
      res.status(200).json({ message: "Cart cleared successfully" });
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body;

    // console.log("Cart Items:");
    // console.log(cart);

    const lineItems = [];

    cart.forEach((item) => {
      const lineItem = {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };

      lineItems.push(lineItem);

      // console.log("Item:", item.quantity, item.name, item.price);
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/cart?success=true",
      cancel_url: "http://localhost:5173/cart?cancel=true",
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/logout", (req, res) => {
  try {
    const { token } = req.cookies;
    if(token && !blackList.includes(token)) {
       blackList.push(token);
    };
   console.log(blackList + 'from logout');
    res.clearCookie("token").json({message: "Cookie deleted and blacklisted"});

  } catch(err) {
    console.error(err);
  }
});

app.listen(process.env.PORT, (req, res) => {
  console.log("Backend running");
});
