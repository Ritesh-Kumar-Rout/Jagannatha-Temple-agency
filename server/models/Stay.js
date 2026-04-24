const mongoose = require('mongoose');

const staySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  bookingLink: { type: String },
  image: { type: String, required: true },
  mapLink: { type: String },
  category: { type: String, required: true, enum: ['hotelsNearTemple', 'mathas', 'hotelsNearBeach'] }
}, { timestamps: true });

module.exports = mongoose.model('Stay', staySchema);
