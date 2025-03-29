const Room = require('../models/room');
const Bid = require('../models/bid');  // optional, if we store bids in a separate model
const Product = require('../models/product');
const User = require('../models/user');

/**
 * Initialize the auction with 5 products for the room
 * Example endpoint: POST /api/auction/:roomId/start
 */
const startAuction = async (req, res) => {
    try {
        const { roomId } = req.params;

        // Find the room
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Check if it's already started or completed
        if (room.status !== 'active') {
            return res.status(400).json({ message: 'Room is not ready for auction or already started' });
        }

        // Fetch or random-pick 5 products for this room's category
        // e.g. find 5 random products from DB
        const products = await Product.aggregate([
            { $match: { category: room.category } },
            { $sample: { size: 5 } } // random 5 docs
        ]);

        // If not enough products found, handle error
        if (products.length < 5) {
            return res.status(400).json({ message: 'Not enough products for the auction in this category' });
        }

        // Attach these product IDs to the room
        room.products = products.map(p => p._id);
        room.currentRound = 0;   // start at round 0
        // Could keep status 'active', or set something like 'in-progress'
        await room.save();

        res.status(200).json({
            message: 'Auction started',
            room,
            products
        });
    } catch (error) {
        console.error('startAuction error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Place a bid for the current round’s product
 * Example endpoint: POST /api/auction/:roomId/bid
 * Body: { "amount": 100 }
 */
const placeBid = async (req, res) => {
    try {
        const { roomId } = req.params;
        const userId = req.user.id; // from jwtAuthMiddleware
        const { amount } = req.body;

        // Validate input
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Bid amount must be positive' });
        }

        // Find the room
        const room = await Room.findById(roomId).populate('products');
        if (!room) return res.status(404).json({ message: 'Room not found' });
        if (room.status === 'completed') {
            return res.status(400).json({ message: 'Game already completed' });
        }

        // Ensure user is in this room
        const isPlayerInRoom = room.users.some(uid => uid.toString() === userId);
        if (!isPlayerInRoom) {
            return res.status(403).json({ message: 'You are not part of this room' });
        }

        // Current product
        const currentProductId = room.products[room.currentRound];
        if (!currentProductId) {
            return res.status(400).json({ message: 'No product for this round' });
        }

        // Option A: store each bid in a separate "Bid" doc
        const newBid = await Bid.create({
            user: userId,
            room: roomId,
            product: currentProductId,
            amount
        });

        // Option B (alternative) -> store bids in a "room.roundBids" array
        // room.roundBids.push({ user: userId, amount, productId: currentProductId });
        // await room.save();

        res.status(200).json({
            message: 'Bid placed successfully',
            bid: newBid
        });
    } catch (error) {
        console.error('placeBid error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * End the current round, determine winner, calculate profit/loss
 * Example endpoint: POST /api/auction/:roomId/end-round
 */
// src/controllers/auctionController.js
// Build scoreboard for all participants
async function buildScoreboard(roomUsers, roundBids = [], winningBid = null, product = null) {
    // roomUsers is an array of User documents (populated from the DB)
    // roundBids is an array of Bid documents for this round
    // winningBid is the top bid
    // product is the current product
    // We'll return an array: one object per user
    const scoreboard = [];

    for (const user of roomUsers) {
        // Did this user place a bid in this round?
        const userBid = roundBids.find(b => b.user.toString() === user._id.toString());

        // Round profit is only relevant if they are the winner
        let roundProfit = 0;
        if (winningBid && winningBid.user.toString() === user._id.toString() && product) {
            roundProfit = product.marketPrice - winningBid.amount;
        }

        scoreboard.push({
            userId: user._id,
            name: user.name,
            // if you want to store user.profileImage or something
            roundBid: userBid ? userBid.amount : 0,
            roundProfit,
            totalEarnings: user.totalEarnings
        });
    }

    return scoreboard;
}

const endRound = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await Room.findById(roomId).populate('products users');
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Get the current product for this round
        const currentProductId = room.products[room.currentRound];
        // If no product, just skip this round
        if (!currentProductId) {
            room.currentRound++;
            if (room.currentRound >= 5) {
                room.status = 'completed';
            }
            await room.save();
            return res.status(200).json({ message: 'No product for this round', room });
        }

        // 1) Retrieve all bids for this round (sorted desc by amount)
        const roundBids = await Bid.find({
            room: roomId,
            product: currentProductId
        }).sort({ amount: -1 });

        // 2) If nobody bid, increment round, possibly complete game
        if (!roundBids.length) {
            room.currentRound++;
            let gameJustCompleted = false;
            if (room.currentRound >= 5) {
                room.status = 'completed';
                gameJustCompleted = true;
            }
            await room.save();

            // Show scoreboard (no changes to earnings)
            const scoreboard = await buildScoreboard(room.users);

            // If game ended, finalize overall match winners
            if (gameJustCompleted) {
                await finalizeMatchWinners(room);
            }

            return res.status(200).json({
                message: 'No bids placed this round',
                room,
                scoreboard
            });
        }

        // 3) Highest bid is first (since sorted desc)
        const winningBid = roundBids[0];
        const product = await Product.findById(currentProductId);

        // Calculate profit for the winner: (marketPrice - bidAmount)
        const profit = product.marketPrice - winningBid.amount;

        // 4) Update winner's totalEarnings
        const winner = await User.findById(winningBid.user);
        winner.totalEarnings += profit;
        await winner.save();

        // 5) Advance round or complete game
        room.currentRound++;
        let gameJustCompleted = false;
        if (room.currentRound >= 5) {
            room.status = 'completed';
            gameJustCompleted = true;
        }
        await room.save();

        // 6) Build scoreboard for all participants
        const scoreboard = await buildScoreboard(room.users, roundBids, winningBid, product);

        // 7) If the match is done (after 5th round), finalize winners
        if (gameJustCompleted) {
            await finalizeMatchWinners(room);
        }

        return res.status(200).json({
            message: 'Round ended',
            winningBid,
            product,
            profit,
            updatedRoom: room,
            scoreboard
        });

    } catch (error) {
        console.error('endRound error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// In the same file (auctionController.js) or a new utils/auctionHelpers.js
const finalizeMatchWinners = async (room) => {
    // We'll load user docs from DB
    // 'room.users' is an array of user IDs
    let maxEarnings = -Infinity;
    const winnerUserIds = [];

    for (const userId of room.users) {
        const userDoc = await User.findById(userId);
        if (!userDoc) continue;

        // Everyone who finished the match increments matchesPlayed
        userDoc.matchesPlayed = (userDoc.matchesPlayed || 0) + 1;

        // Track if this user has the highest totalEarnings
        if (userDoc.totalEarnings > maxEarnings) {
            maxEarnings = userDoc.totalEarnings;
            winnerUserIds.length = 0; // reset the array
            winnerUserIds.push(userDoc._id);
        } else if (userDoc.totalEarnings === maxEarnings) {
            // In case of a tie, keep them as multiple winners
            winnerUserIds.push(userDoc._id);
        }

        await userDoc.save();
    }

    // Now increment matchesWon for the top earner(s)
    for (const winnerId of winnerUserIds) {
        const winnerDoc = await User.findById(winnerId);
        winnerDoc.matchesWon = (winnerDoc.matchesWon || 0) + 1;
        await winnerDoc.save();
    }
};

module.exports = {
    startAuction,
    placeBid,
    endRound
};
