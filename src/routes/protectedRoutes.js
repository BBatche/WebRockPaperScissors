// src/routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../authMiddleware');

// Protected route
router.get('/protected', authenticateUser, async (req, res) => {
  try {
    // Example protected route handler
    res.json({ message: 'Protected route accessed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
