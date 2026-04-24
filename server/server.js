require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const chatRoutes = require('./routes/chat');
const templeRoutes = require('./routes/templeRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const cmsRoutes = require('./routes/cmsRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', process.env.CLIENT_URL].filter(Boolean),
  credentials: true, // Required for cookies
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/temple', templeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cms', cmsRoutes);

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ratha_yatra_chatbot')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
