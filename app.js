// ✅ 1. Load environment variables first
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');

const app = express();

// ✅ 2. Enable CORS for Vercel frontend
app.use(cors({
  origin: 'https://frontend-7sre.vercel.app', // ⬅️ replace with actual Vercel frontend URL
  credentials: true,
}));

app.use(express.json());

// ✅ 3. Setup routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// ✅ 4. Fallback route for debugging (optional)
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

// ✅ 5. Connect to MongoDB and start server
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });
