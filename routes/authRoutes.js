const express = require('express');
const router = express.Router();
const { registerUser, loginUser ,getUser} = require('../controllers/authController');

// Route to register user
router.post('/register', registerUser);

// Route to login user
router.post('/login', loginUser);

// Route to username
router.get('/users', getUser);

module.exports = router;
