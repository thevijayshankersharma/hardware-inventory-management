'use strict';

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const connectDB = require('./config/database');
const hardwareRoutes = require('./routes/hardware'); // Adjust the import based on your routes
const userRoutes = require('./routes/users'); // Adjust the import based on your routes
const app = express();

// Connect to MongoDB
connectDB();

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Middleware
app.use(express.json()); // Enable JSON parsing
app.use('/api/hardware', hardwareRoutes); // Set up hardware routes
app.use('/api/users', userRoutes); // Set up user routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});