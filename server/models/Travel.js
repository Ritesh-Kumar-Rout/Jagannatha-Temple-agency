const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  transport_type: { type: String, required: true, enum: ['bus', 'train', 'flight', 'local'] },
  title: { type: String, required: true },
  description: { type: String, required: true },
  timing: { type: String },
  price: { type: String },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Travel', travelSchema);
