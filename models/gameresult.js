const mongoose = require('mongoose');

const gameResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  totalProfit: { type: Number, required: true },
  position: { type: Number }, // 1 = Winner
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GameResult', gameResultSchema);
