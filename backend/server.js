const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running 🚀");
});
// ADD ORDER
app.post("/add-order", (req, res) => {
  const { name, product, quantity } = req.body;

  const sql = "INSERT INTO orders (name, product, quantity) VALUES (?, ?, ?)";

  db.query(sql, [name, product, quantity], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.send("Success");
    }
  });
});

// GET ORDERS
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) {
      res.send("Error");
    } else {
      res.json(result);
    }
  });
});