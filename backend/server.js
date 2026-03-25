const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("DB Connected ✅");
});

// POST
app.post("/orders", (req, res) => {
  const { name, email, studentClass, item } = req.body;

  db.query(
    "INSERT INTO orders (name, email, class, item) VALUES (?, ?, ?, ?)",
    [name, email, studentClass, item],
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

// GET
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

app.listen(process.env.PORT || 3000);