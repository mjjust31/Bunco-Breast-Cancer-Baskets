require('dotenv').config();
const mongoose = require('mongoose');

// Log to confirm MONGO_URI is being read
console.log("✅ MONGO_URI being used:", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is undefined. Check your .env file.");
    }

    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
