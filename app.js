const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/matchmaking', require('./routes/matchMakingRoutes'));
app.use('/api/auction', require('./routes/auctionRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

module.exports = app;
