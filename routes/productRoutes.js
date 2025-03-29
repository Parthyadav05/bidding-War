// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware } = require('../utils/jwt');
const { generateProducts } = require('../controllers/productController');

// Protected route so only certain users can generate new products
router.post('/generate', jwtAuthMiddleware, generateProducts);

module.exports = router;
