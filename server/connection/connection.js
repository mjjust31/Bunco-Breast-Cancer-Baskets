require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose'); // Import Mongoose

// MongoDB connection string
const uri = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    });
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error); // Log detailed connection error
    process.exit(1); // Exit the process if DB connection fails
  }
};

module.exports = connectDB;
