const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection(process.env.const db = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);

db.connect((err) => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("Connected to Railway DB ✅");
  }
}););

db.connect((err) => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("Connected to Railway DB ✅");
  }
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

app.post("/order", (req, res) => {
  const { name, email, product, quantity } = req.body;

  db.query(
    "INSERT INTO orders (name, email, product, quantity) VALUES (?, ?, ?, ?)",
    [name, email, product, quantity],
    (err) => {
      if (err) throw err;
      res.send("Saved");
    }
  );
});
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
