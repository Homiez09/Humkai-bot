const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  coins: { type: Number, default: 500 },
  bank: { type: Number, default: 0 },
  protection: { type: Boolean, default: false},
  lottery: { type: Number, default: 0 },
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;
