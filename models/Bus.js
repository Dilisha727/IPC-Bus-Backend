const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
