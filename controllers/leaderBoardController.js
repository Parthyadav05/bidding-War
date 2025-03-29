// src/controllers/userController.js

const User = require('../models/user');

/**
 * Returns top N users based on totalEarnings (descending).
 * You can also sort by matchesWon or any other metric you have.
 */
const getLeaderboard = async (req, res) => {
  try {
    // Decide how many users you want on the leaderboard (default 10).
    const limit = parseInt(req.query.limit) || 10;

    // Query users, sorted descending by totalEarnings.
    // .select() can be used to limit fields if you want to hide email/password, etc.
    const topUsers = await User.find({})
      .sort({ totalEarnings: -1 })
      .limit(limit)
      .select('name totalEarnings matchesWon profileImage');

    res.json({ leaderboard: topUsers });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { getLeaderboard };
