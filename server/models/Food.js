const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String },
  orderLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
