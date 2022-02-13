const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  guild_ID: { type: String, required: true, unique: true },
  voice_ID: { type: String },
  input_ID: { type: String },
  output_ID: { type: String },
});

const model = mongoose.model('ChannelModels', channelSchema);

module.exports = model;
