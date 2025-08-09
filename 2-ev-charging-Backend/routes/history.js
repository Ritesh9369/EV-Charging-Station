const express = require("express");
const router = express.Router();
const db = require("../config/db"); // MySQL connection

// API to fetch user booking history
router.get("/", (req, res) => {
  const userId = req.query.user_id;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const query = `
        SELECT 
            b.booking_id, 
            b.station_name, 
            b.station_address, 
            b.booking_date, 
            b.booking_time, 
            b.price, 
            p.payment_status, 
            b.created_at 
        FROM bookings b
        LEFT JOIN payments p ON b.booking_id = p.booking_id
        WHERE b.user_id = ? 
        ORDER BY b.created_at DESC;
    `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
