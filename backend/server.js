const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// ✅ MySQL connection (Railway ENV)
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect((err) => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

// ✅ Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Insert order
app.post("/add-order", (req, res) => {
  console.log("DATA RECEIVED:", req.body);

  const { name, email, className, item } = req.body;

  const sql = "INSERT INTO orders (name, email, class, item) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, className, item], (err, result) => {
    if (err) {
      console.log("INSERT ERROR:", err);
      return res.send("Error inserting data");
    } else {
      console.log("Inserted!");
      res.send("Order Placed Successfully ✅");
    }
  });
});

// ✅ View orders
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) {
      return res.send("Error fetching data");
    }
    res.json(result);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});