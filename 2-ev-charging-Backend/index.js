const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const multer = require("multer");
const path = require("path");
const historyRoutes = require("./routes/history");


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Authentication Routes
app.use("/auth", authRoutes);

app.use("/api/history", historyRoutes);

// Route to handle booking data insertion
app.post("/bookings", (req, res) => {
  const {
    user_id,
    user_name,
    station_name,
    station_address,
    booking_date,
    booking_time,
    price
  } = req.body;
  const sql =
    "INSERT INTO bookings (user_id,user_name, station_name, station_address, booking_date, booking_time, price) VALUES (?,?,?, ?, ?, ?, ?)";
  db.query(
    sql,
    [user_id,user_name, station_name, station_address, booking_date, booking_time, price],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database Error", details: err });
      }
      res.json({ success: true, booking_id: result.insertId });
    }
  );
});

// Route to handle payments
app.post("/payments", (req, res) => {
  const { booking_id, user_id, card_number, expiry, cvv, amount_paid } =
    req.body;
  const sql =
    "INSERT INTO payments (booking_id, user_id, card_number, expiry, cvv, amount_paid, payment_status) VALUES (?, ?, ?, ?, ?, ?, 'success')";
  db.query(
    sql,
    [booking_id, user_id, card_number, expiry, cvv, amount_paid],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Payment Error", details: err });
      }
      res.json({ success: true, payment_id: result.insertId });
    }
  );
});
// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// 📌 GET User Profile
app.get("/api/profile/:id", (req, res) => {
  const userId = req.params.id;
  db.query(
    "SELECT full_name, email, phone, profile_image FROM users WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Database query error" });
      } else if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  );
});

// 📌 UPDATE User Profile
app.put("/api/profile/update/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email, phone } = req.body;

  db.query(
    "UPDATE users SET full_name = ?, email = ?, phone = ? WHERE user_id = ?",
    [name, email, phone, userId],
    (err) => {
      if (err) {
        res.status(500).json({ error: "Error updating profile" });
      } else {
        res.json({ success: true, message: "Profile updated successfully" });
      }
    }
  );
});

// 📌 Profile Image Upload (Using Multer)
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/api/profile/upload/:id", upload.single("profile_image"), (req, res) => {
  const userId = req.params.id;
  const profileImage = `/uploads/${req.file.filename}`;

  db.query(
    "UPDATE users SET profile_image = ? WHERE user_id = ?",
    [profileImage, userId],
    (err) => {
      if (err) {
        res.status(500).json({ error: "Error uploading image" });
      } else {
        res.json({ success: true, profile_image: profileImage });
      }
    }
  );
});


app.listen(5000, () => {
  console.log("Server running on port 5000 ✅");
});
