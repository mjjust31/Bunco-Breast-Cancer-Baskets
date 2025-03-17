require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./connection/connection');  // Import MongoDB connection function
const Basket = require('./models/Basket');  // Import Basket model

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

// ✅ Connect to MongoDB
connectDB();

// ====== FAVORITES API ======

// Simulated "database" for user favorites
let favoritesDb = {}; // { username: [favoriteBasketIds] }

// Get all favorites for a user
app.get("/api/favorites/:username", (req, res) => {
  const { username } = req.params;
  res.json(favoritesDb[username] || []);
});

// Add a basket to favorites
app.post("/api/favorites/:username", (req, res) => {
  const { username } = req.params;
  const { basketId } = req.body;

  if (!basketId) {
    return res.status(400).json({ error: "basketId is required" });
  }

  if (!favoritesDb[username]) {
    favoritesDb[username] = [];
  }

  // Avoid duplicates
  if (!favoritesDb[username].includes(basketId)) {
    favoritesDb[username].push(basketId);
  }

  res.json(favoritesDb[username]);
});

// Remove a basket from favorites
app.delete("/api/favorites/:username", (req, res) => {
  const { username } = req.params;
  const { basketId } = req.body;

  if (!basketId) {
    return res.status(400).json({ error: "basketId is required" });
  }

  if (favoritesDb[username]) {
    favoritesDb[username] = favoritesDb[username].filter((id) => id !== basketId);
  }

  res.json(favoritesDb[username] || []);
});

// ====== ADMINISTRATOR (BASKETS) API ======

// Get all baskets from MongoDB
app.get("/api/administrator", async (req, res) => {
  try {
    const baskets = await Basket.find();  // Fetch baskets from MongoDB
    res.json(baskets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch baskets" });
  }
});

// Add a new basket to MongoDB
app.post("/api/administrator", async (req, res) => {
  try {
    const { name, content } = req.body;
    const newBasket = new Basket({ name, content });
    await newBasket.save();  // Save to MongoDB
    const updatedBaskets = await Basket.find();  // Get all baskets after adding new one
    res.json(updatedBaskets);
  } catch (error) {
    res.status(500).json({ error: "Failed to add basket" });
  }
});

// Edit an existing basket in MongoDB
app.put("/api/administrator/:id", async (req, res) => {
  try {
    const updatedBasket = await Basket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const updatedBaskets = await Basket.find();
    res.json(updatedBaskets);
  } catch (error) {
    res.status(500).json({ error: "Failed to edit basket" });
  }
});

// Delete a single basket from MongoDB
app.delete("/api/administrator/:id", async (req, res) => {
  try {
    await Basket.findByIdAndDelete(req.params.id);
    const updatedBaskets = await Basket.find();
    res.json(updatedBaskets);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete basket" });
  }
});

// Delete all baskets from MongoDB
app.delete("/api/administrator", async (req, res) => {
  try {
    await Basket.deleteMany({});
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete all baskets" });
  }
});

// ====== SERVE REACT FRONTEND ======
// This ensures React handles frontend routes (like /favorites or /administrator)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
