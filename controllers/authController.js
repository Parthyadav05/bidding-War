const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email is in use
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    // Create & save user
    const user = new User({ name, email, password });
    await user.save();

    // If you only want user ID in token:
    // const token = generateToken({ id: user._id });
    // or pass more user info if needed:
    const token = generateToken({ id: user._id, role: user.role });

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        title: user.title,
        role: user.role,
      },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // If only ID in payload:
    // const token = generateToken({ id: user._id });
    // or more fields:
    const token = generateToken({ id: user._id, role: user.role });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        title: user.title,
        role: user.role,
      },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };
