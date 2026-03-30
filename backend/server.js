const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "..")));

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Portfolio
app.get("/portfolio", (req, res) => {
  res.sendFile(path.join(__dirname, "../portfolio.html"));
});

// INSERT ORDER (FINAL FIXED)
app.post("/add-order", async (req, res) => {
  console.log("DATA RECEIVED:", req.body);

  const name = req.body.name;
  const email = req.body.email;
  const address = req.body.class;
  const item = req.body.item;

  try {
    await pool.query(
      "INSERT INTO orders (name, email, address, item) VALUES ($1, $2, $3, $4)",
      [name, email, address, item]
    );

    res.send("Order Placed Successfully 🍽️");
  } catch (err) {
    console.log("INSERT ERROR:", err);
    res.send("Error inserting data");
  }
});

// VIEW ORDERS
app.get("/orders", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders");
    res.json(result.rows);
  } catch (err) {
    res.send("Error fetching data");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});