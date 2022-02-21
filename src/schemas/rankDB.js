const mongoose = require('mongoose');

const rankSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  rank: { type: Number, default: 0 },
  exp: { type: Number, default: 0 },
  totalExp: { type: Number, default: 0 },
});

const model = mongoose.model('rankModels', rankSchema);

module.exports = model;
