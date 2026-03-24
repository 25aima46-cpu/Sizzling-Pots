const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);

db.connect((err) => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("Connected to Railway DB ✅");
  }
});

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});