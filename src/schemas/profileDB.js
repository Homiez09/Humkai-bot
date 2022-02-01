const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  coins: { type: Number, default: 500 },
  bank: { type: Number, default: 0 },
  protection: { type: Boolean, default: false },
  lottery: { type: String, default: NaN },
  fish: { type: Number, default: 0 },
  mine: { type: Number, default: 0 },
  harvest: { type: Number, default: 0 },
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;
