require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport =  require('passport')
const mysql = require('mysql');
const cors = require('cors');
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:5174'}));
app.use("/uploads", express.static(__dirname + "/uploads"));

const salt = bcrypt.genSaltSync(10);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// app.get("/secrets", (req, res) => {
//     if(req.isAuthenticated) {
//         res.render("/")
//     } else {
//         res.redirect("/login");
//     }
// })

app.post("/register", (req, res) => {
   try{
       const { username, password } = req.body 

       const hashedPass = bcrypt.hashSync(password, salt);

       const q = "SELECT * FROM luxury_store.users WHERE username = '?'"
       
       db.query(q, [username], (data, err) => {
        if(err) {
            res.status(501).json({message: "Error creating user"})
        }
        if(data.length > 0) {
            res.status(409).json({message: "User already exists"})
        } else {
           const q = "INSERT INTO luxury_store.users (`username`, `password) VALUES(?,?)"

           db.query(q, [username, hashedPass], (data, err) => {
                if (err) {
                    res.status(500).json({message: "Internal server error"});
                }
           })
        }
       })

}catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }

   

})

app.post("/login", (req, res) => {
     const { username, password } =  req.body;
})

app.listen(process.env.PORT, (req, res) => {
    console.log("Backend running")
})







