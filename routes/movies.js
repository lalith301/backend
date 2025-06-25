const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// ✅ Auth Middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// ✅ GET /api/movies - return 2 hardcoded movies
router.get('/', auth, (req, res) => {
  res.json([
    {
      Title: 'Inception',
      Year: '2010',
      Type: 'Movie',
      Poster: 'https://m.media-amazon.com/images/I/51nbVEuw1HL._AC_.jpg'
    },
    {
      Title: 'Interstellar',
      Year: '2014',
      Type: 'Movie',
      Poster: 'https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg'
    }
  ]);
});

module.exports = router;
