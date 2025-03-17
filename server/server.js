require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./connection/connection"); // Import MongoDB connection function
const Basket = require("./models/Basket"); // Import Basket model

const app = express();
const PORT = process.env.PORT || 5050;

console.log("Server is running");

// Middleware
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

// ✅ Connect to MongoDB
connectDB();

// Serve static files from the correct folder (client, not dist)
app.use(express.static(path.join(__dirname, "../client"))); // Updated

// ====== ✅ PUBLIC ROUTE: GET ALL BASKETS FOR USERS ======
app.get("/api/baskets", async (req, res) => {
  console.log("🛠️ GET /api/baskets was called!"); // ✅ Log to check if request is received
  try {
    const baskets = await Basket.find({});
    res.json(baskets);
  } catch (error) {
    console.error("❌ Failed to fetch baskets:", error);
    res.status(500).json({ error: "Failed to fetch baskets" });
  }
});

// ====== ✅ ADMIN ROUTES (Restricted) ======
// Only Admins Can Add, Edit, Delete Baskets

// ✅ Add a new basket (Admin only)
app.post("/api/baskets/admin", async (req, res) => {
  try {
    const { name, content } = req.body;
    console.log("New basket to save:", { name, content }); // Log to check received data

    const newBasket = new Basket({ name, content });
    await newBasket.save(); // Save to MongoDB

    const updatedBaskets = await Basket.find(); // Get all baskets after adding the new one
    console.log("Updated baskets:", updatedBaskets); // Log all baskets

    res.json(updatedBaskets); // Send the updated baskets array to frontend
  } catch (error) {
    console.error("Error adding basket:", error);
    res.status(500).json({ error: "Failed to add basket" });
  }
});

// ✅ Edit an existing basket (Admin only)
app.put("/api/baskets/admin/:id", async (req, res) => {
  try {
    await Basket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const updatedBaskets = await Basket.find();
    res.json(updatedBaskets);
  } catch (error) {
    res.status(500).json({ error: "Failed to edit basket" });
  }
});

// ✅ Delete a single basket (Admin only)
app.delete("/api/baskets/admin/:id", async (req, res) => {
  try {
    await Basket.findByIdAndDelete(req.params.id);
    const updatedBaskets = await Basket.find();
    res.json(updatedBaskets);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete basket" });
  }
});

// ✅ Delete all baskets (Admin only)
app.delete("/api/baskets/admin", async (req, res) => {
  try {
    await Basket.deleteMany({});
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete all baskets" });
  }
});

// ====== ✅ USER FAVORITES API ======

// Simulated "database" for user favorites
let favoritesDb = {}; // { username: [favoriteBasketIds] }

// ✅ Get all favorites for a user
app.get("/api/:username/favorites", (req, res) => {
  const { username } = req.params;
  res.json(favoritesDb[username] || []);
});

// ✅ Add a basket to favorites
app.post("/api/:username/favorites", (req, res) => {
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

// ✅ Remove a basket from favorites
app.delete("/api/:username/favorites", (req, res) => {
  const { username } = req.params;
  const { basketId } = req.body;

  if (!basketId) {
    return res.status(400).json({ error: "basketId is required" });
  }

  if (favoritesDb[username]) {
    favoritesDb[username] = favoritesDb[username].filter(
      (id) => id !== basketId
    );
  }

  res.json(favoritesDb[username] || []);
});

// ====== ✅ SERVE REACT FRONTEND ======
// Catch-all route to ensure React Router can handle frontend routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html")); // Updated
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
