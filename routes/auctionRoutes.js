// src/routes/auctionRoutes.js
const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware } = require('../utils/jwt');
const {
  startAuction,
  placeBid,
  endRound
} = require('../controllers/auctionController');

// Start auction for the room
router.post('/:roomId/start', jwtAuthMiddleware, startAuction);

// Place a bid in current round
router.post('/:roomId/bid', jwtAuthMiddleware, placeBid);

// End current round, pick a winner, proceed
router.post('/:roomId/end-round', jwtAuthMiddleware, endRound);

module.exports = router;
