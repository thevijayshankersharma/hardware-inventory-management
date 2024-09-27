const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const hardwareRoutes = require('./routes/hardware');
const userRoutes = require('./routes/auth'); // Change this to auth for consistency with your routes

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Use CORS middleware with the specified origin
app.use(cors({ origin: 'https://hardware-inventory-management.vercel.app' }));

app.use(express.json());

// Routes
app.use('/api/hardware', hardwareRoutes);
app.use('/api/auth', userRoutes); // Updated to use auth routes for login and registration

// Test Database Connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await mongoose.connection.db.admin().ping();
    res.status(200).json({ message: 'Database is connected', result });
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
