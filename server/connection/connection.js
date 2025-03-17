require('dotenv').config(); // Load environment variables from .env file
const { MongoClient } = require('mongodb'); // MongoDB Driver

// MongoDB connection string (you can also keep this in .env)
const uri = process.env.MONGODB_URI || "mongodb+srv://mjjustmann:ayS8TwnH7q2v7YSd@cluster0.5fgma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    console.log('✅ MongoDB Connected!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1); // Exit the process if DB connection fails
  }
};

module.exports = connectDB;
