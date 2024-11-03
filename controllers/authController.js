const db = require('../models/userModel');

// Register User
const registerUser = (req, res) => {
  const { username, password } = req.body;
  db.run(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, password],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'User registered successfully' });
    }
  );
};

// Login User
const loginUser = (req, res) => {
  const { username, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (row) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    }
  );
};

module.exports = { registerUser, loginUser };
