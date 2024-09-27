const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Use new URL parser
      useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
    });
    console.log('MongoDB connected successfully');

    // Optional: Handle connection events for better error tracking
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
