const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../models/User");

const SECRET_KEY = "EVCHARGING_SECRET"; // Change this in production

exports.signup = (req, res) => {
  const { fullName, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: "Hashing failed" });

    createUser(fullName, email, hash, null, (error, result) => {
      if (error) return res.status(500).json({ error: "Signup failed" });

      res.json({ message: "Signup successful!" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  getUserByEmail(email, (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ error: "Invalid User Go To Sign UP" });

    const user = results[0];

    bcrypt.compare(password, user.password_hash, (error, match) => {
      if (!match) return res.status(401).json({ error: "Invalid password" });

      const token = jwt.sign({ id: user.user_id }, SECRET_KEY, {
        expiresIn: "1h"
      });
      res.json({ token, message: "Login successful!" });
      
    });
  });
};

exports.googleSignup = (req, res) => {
  const { fullName, email, googleId } = req.body;

  if (!email || !googleId) {
    return res.status(400).json({ error: "Invalid Google signup data" });
  }

  createUser(fullName, email, null, googleId, (err, result) => {
    if (err) {
      console.error("Google Signup Error:", err);
      return res.status(500).json({ error: "Google signup failed" });
    }

    res.json({ message: "Google signup successful!" });
  });
};
