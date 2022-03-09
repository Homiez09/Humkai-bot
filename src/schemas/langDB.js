const mg = require('mongoose');

const langSchema = new mg.Schema({
  id: { type: String, required: true, unique: true },
  lang: { type: String, required: true },
});

const model = mg.model('langModels', langSchema);

module.exports = model;
