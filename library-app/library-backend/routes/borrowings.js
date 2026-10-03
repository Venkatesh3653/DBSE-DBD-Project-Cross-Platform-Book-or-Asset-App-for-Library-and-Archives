const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT borrowings.*, books.title as book_title, users.name as user_name 
      FROM borrowings 
      JOIN books ON borrowings.book_id = books.id 
      JOIN users ON borrowings.user_id = users.id
    `;
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;