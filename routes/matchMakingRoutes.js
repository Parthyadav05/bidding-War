const express = require('express');
const router = express.Router();
const { joinMatchmaking } = require('../controllers/matchmakingController');
const { jwtAuthMiddleware } = require('../utils/jwt'); // Protecting routes

// POST /api/matchmaking/join
// Example Body: { "category": "cars" }
router.post('/join', jwtAuthMiddleware, joinMatchmaking);

module.exports = router;
