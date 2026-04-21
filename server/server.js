require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chatRoutes = require('./routes/chat');
const templeRoutes = require('./routes/templeRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/temple', templeRoutes);
app.use('/api/bookings', bookingRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ratha_yatra_chatbot')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
