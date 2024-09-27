const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const hardwareRoutes = require('./routes/hardware');
const userRoutes = require('./routes/auth'); // Change this to auth for consistency with your routes

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/hardware', hardwareRoutes);
app.use('/api/auth', userRoutes); // Updated to use auth routes for login and registration

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
