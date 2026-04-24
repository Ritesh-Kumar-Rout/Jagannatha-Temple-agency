const mongoose = require('mongoose');

const ritualSchema = new mongoose.Schema({
  title: { type: String, required: true },
  emoji: { type: String, default: '' },
  shortDesc: { type: String, required: true },
  timing: { type: String, required: true },
  location: { type: String, required: true },
  significance: { type: String, required: true },
  fact: { type: String, required: true },
  gallery: [{ type: String }],
  details: { type: String, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Ritual', ritualSchema);
