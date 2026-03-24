const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Railway DB connection (IMPORTANT)
const db = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);

db.connect((err) => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("Connected to Railway DB ✅");
  }
});

// API to insert order
app.post("/order", (req, res) => {
  const { name, email, product, quantity } = req.body;

  const sql = "INSERT INTO orders (name, email, product, quantity) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, product, quantity], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.send("Order placed successfully ✅");
    }
  });
});

// API to get orders
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
const path = require("path");

app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
const path = require("path");

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});