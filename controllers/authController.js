const db = require("../models/userModel");

// Register User
const registerUser = (req, res) => {
  const { username, password } = req.body;
  db.query(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, password],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "User registered successfully" });
    }
  );
};

// Login User
const loginUser = (req, res) => {
  const { username, password } = req.body;
  db.query(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (row.length > 0) {
        res.json({ message: "Login successful" });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    }
  );
};

// Get User
const getUser = (req, res) => {
  db.query(
    `SELECT username FROM users `,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (rows.length > 0) {
        res.json({
          message: "Users retrieved successfully",
          users: rows, // Return the list of users
        });
      } else {
        res.status(400).json({ message: "no users in database" });
      }
    }
  );
};


module.exports = { registerUser, loginUser ,getUser};
