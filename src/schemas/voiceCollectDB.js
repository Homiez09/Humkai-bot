const mg = require('mongoose');

const voiceCollectSchema = new mg.Schema({
  user_ID: { type: String, required: true },
  channel_ID: { type: String, required: true }
})

const model = mg.model('voiceCollectModels', voiceCollectSchema);

module.exports = model;