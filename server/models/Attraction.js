const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  history: { type: String },
  image: { type: String, required: true },
  distance: { type: String },
  visitingHours: { type: String },
  mapLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Attraction', attractionSchema);
