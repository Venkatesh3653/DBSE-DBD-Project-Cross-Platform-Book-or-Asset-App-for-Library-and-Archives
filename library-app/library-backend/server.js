const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const booksRouter = require('./routes/books');
const usersRrouter = require('./routes/users');
const borrowingsRouter = require('./routes/borrowings');

// Use Routes
app.use('/api/books', booksRouter);
app.use('/api/users', usersRrouter);
app.use('/api/borrowings', borrowingsRouter);

// Test Route
app.get('/', (req, res) => {
  res.send('Library Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});