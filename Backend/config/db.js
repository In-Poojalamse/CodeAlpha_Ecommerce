const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PoojaLamse@05",
  database: "ecommerce_db"
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("MySQL Database Connected!");
});

module.exports = connection;