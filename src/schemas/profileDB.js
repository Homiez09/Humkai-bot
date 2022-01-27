const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },
    coins: { type: Number, default: 1000 },
    lottery: { type: Number, default: 0 }
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;