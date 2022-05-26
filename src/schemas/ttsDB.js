const mongoose = require('mongoose');

const ttsSchema = new mongoose.Schema({
  guildID: { type: String, required: true, unique: true },
  channelID: { type: String },
  ttsStatus: { type: Boolean, default: false },
  content: { type: Array, default: [] },
});

const model = mongoose.model('ttsModels', ttsSchema);

module.exports = model;
