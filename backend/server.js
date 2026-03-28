const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, "..")));

// ✅ MySQL connection (Railway)
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  ssl: {
    rejectUnauthorized: false
  }
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
  res.sendFile(path.join(__dirname, "../index.html"));
});

// ✅ Portfolio page
app.get("/portfolio", (req, res) => {
  res.sendFile(path.join(__dirname, "../portfolio.html"));
});

// ✅ Insert order
app.post("/add-order", (req, res) => {
  console.log("DATA RECEIVED:", req.body);

  const { name, email, class: studentClass, item } = req.body;

  const sql = "INSERT INTO orders (name, email, class, item) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, studentClass, item], (err, result) => {
    if (err) {
      console.log("INSERT ERROR:", err);
      return res.send("Error inserting data");
    }
    res.send("Order Placed Successfully ✅");
  });
});

// ✅ View orders
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) return res.send("Error fetching data");
    res.json(result);
  });
});

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});