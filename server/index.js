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
              expiresIn: "1H",
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
      if(err) {
        res.json({message: "Error fetching watches"})
      } else {
        return res.json(data);
      }
      
      console.log(data);
      
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/watch:id", (req, res) => {
  const id = req.params.id;
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
});

app.listen(process.env.PORT, (req, res) => {
  console.log("Backend running");
});
