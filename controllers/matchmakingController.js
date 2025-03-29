// src/controllers/matchmakingController.js

const Room = require('../models/room');       // our Mongoose Room model
const User = require('../models/user');       // in case we need user data

// Join or create a room
const joinMatchmaking = async (req, res) => {
  try {
    // The user object is attached by our JWT middleware
    const userId = req.user.id;  
    const { category } = req.body; 
    // e.g. "phones", "cars", "watches", etc.

    // 1) Check if user is already in a room (optional)
    const existingRoom = await Room.findOne({ users: userId, status: { $ne: 'completed' } });
    if (existingRoom) {
      return res.status(400).json({ message: 'You are already in an active room.' });
    }

    // 2) Find a waiting room with fewer than 5 users & matching category
    let room = await Room.findOne({
      status: 'waiting',
      category,
      $expr: { $lt: [{ $size: '$users' }, 5] }
    });

    // 3) If no such room, create a new one
    if (!room) {
      room = new Room({
        roomCode: generateRoomCode(), // optional helper
        category,
        users: [],
        status: 'waiting'
      });
    }

    // 4) Add this user to the room’s users array
    room.users.push(userId);

    // 5) If room has 5 users => mark as active
    if (room.users.length >= 5) {
      room.status = 'active';
    }

    await room.save();

    res.status(200).json({
      message: 'Joined room successfully',
      room
    });
  } catch (err) {
    console.error('Matchmaking error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Optional small helper to generate a unique room code
function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); 
  // e.g. "A1B2C3"
}

module.exports = {
  joinMatchmaking
};
