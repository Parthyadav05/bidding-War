const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  marketPrice: { type: Number, required: true }, // Hidden during bidding
  category: { type: String, required: true },
  source: { type: String, default: 'amazon' }, // amazon, ebay, etc.
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
