const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10, // Max 10 connections
  host: "localhost",
  user: "root",
  password: "___YOUR_PASSWORD___", // Replace with your MySQL password
  port: 3306, // Default MySQL port
  database: "---YOUR_DATABASE---", // Replace with your database name
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database Connection Failed:", err);
  } else {
    console.log("Connected to MySQL Database ✅");
    connection.release(); // Release connection back to pool
  }
});

module.exports = pool;
