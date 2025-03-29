// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware } = require('../utils/jwt');
const { getLeaderboard } = require('../controllers/leaderBoardController');

/**
 * GET /api/user/leaderboard
 * Optionally protected or public
 */
router.get('/leaderboard', jwtAuthMiddleware, getLeaderboard);

module.exports = router;
