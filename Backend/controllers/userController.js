const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// User Registration
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user instance
    const user = new User({ username, password }); // password will be hashed in pre-save hook
    await user.save();

    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the entered password with the hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
