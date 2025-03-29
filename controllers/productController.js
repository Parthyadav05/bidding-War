
const Product = require('../models/product');
const { generateProductsFromGemini } = require('../services/geminiService');

const generateProducts = async (req, res) => {
  try {
    const { category, count = 5 } = req.body;
    // 1) Ask Gemini for product data
    const aiProducts = await generateProductsFromGemini(category, count);

    // 2) Insert them into MongoDB
    const inserted = await Product.insertMany(aiProducts);

    res.status(201).json({
      message: 'AI-generated products added to database',
      products: inserted
    });
  } catch (err) {
    console.error('generateProducts error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { generateProducts };
