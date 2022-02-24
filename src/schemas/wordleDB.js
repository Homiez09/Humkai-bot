const mongoose = require('mongoose');

const wordleSchema = new mongoose.Schema({
  user_ID: { type: String, required: true, unique: true },
  day: { type: Number, default: 0 },
  working: { type: Boolean, default: false },
  word: { type: String, default: '' },
  doing: { type: Array, default: [] },
});

const model = mongoose.model('WordleModels', wordleSchema);

module.exports = model;
