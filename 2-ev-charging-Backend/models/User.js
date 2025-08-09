const db = require("../config/db");

const createUser = (fullName, email, passwordHash, googleId, callback) => {
  const query = `
    INSERT INTO users (full_name, email, password_hash, google_id) 
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE google_id = VALUES(google_id);
  `;
  db.query(query, [fullName, email, passwordHash || null, googleId || null], callback);
};

const getUserByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], callback);
};

module.exports = { createUser, getUserByEmail };
