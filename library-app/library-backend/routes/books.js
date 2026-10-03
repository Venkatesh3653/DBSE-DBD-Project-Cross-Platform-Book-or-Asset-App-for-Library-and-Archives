const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all books
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM books');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a book
router.post('/', async (req, res) => {
  const { title, author, isbn, category, availableCopies, totalCopies } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO books (title, author, isbn, category, available_copies, total_copies) VALUES (?, ?, ?, ?, ?, ?)',
      [title, author, isbn, category, availableCopies || 1, totalCopies || 1]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;