const mongoose = require('mongoose');

const ttsSchema = new mongoose.Schema({
    guildID: { type: String, required: true, unique: true },
    channelID: { type: String },
    ttsStatus: { type: Boolean, default: false },
});

const model = mongoose.model('ttsModels', ttsSchema);

module.exports = model;