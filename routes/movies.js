const express = require('express');
const jwt = require('jsonwebtoken');
const Movie = require('../models/Movie');
const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/', auth, async (req, res) => {
  const movies = await Movie.find({ author: req.user.id });
  res.json(movies);
});

router.post('/', auth, async (req, res) => {
  const movie = new Movie({ ...req.body, author: req.user.id });
  await movie.save();
  res.json(movie);
});

module.exports = router;
