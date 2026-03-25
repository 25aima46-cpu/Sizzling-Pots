const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ DATABASE CONNECTION
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
    console.log("Connected to DB ✅");
  }
});

// ✅ SERVE FRONTEND
app.use(express.static(path.join(__dirname, "../")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// ✅ ADD ORDER
app.post("/add-order", (req, res) => {
  console.log("DATA RECEIVED:", req.body);

  const { name, product, quantity } = req.body;

  const sql = "INSERT INTO orders (name, product, quantity) VALUES (?, ?, ?)";

  db.query(sql, [name, product, quantity], (err, result) => {
    if (err) {
      console.log("INSERT ERROR:", err);
      res.send("Error inserting data");
    } else {
      console.log("Inserted!");
      res.send("Order Placed Successfully ✅");
    }
  });
});

// ✅ VIEW ORDERS
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) {
      res.send("Error fetching data");
    } else {
      let html = `
        <h1>Orders List 📦</h1>
        <table border="1" cellpadding="10">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
      `;

      result.forEach(row => {
        html += `
          <tr>
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.product}</td>
            <td>${row.quantity}</td>
          </tr>
        `;
      });

      html += "</table>";

      res.send(html);
    }
  });
});

// ✅ START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running 🚀");
});