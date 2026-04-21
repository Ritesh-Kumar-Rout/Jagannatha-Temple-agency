const mongoose = require('mongoose');

const FestivalInfoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['history', 'schedule', 'rituals', 'chariots', 'temple', 'travel', 'significance', 'facts'],
  }
});

module.exports = mongoose.model('FestivalInfo', FestivalInfoSchema);
