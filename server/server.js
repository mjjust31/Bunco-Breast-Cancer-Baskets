const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

// ✅ Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "../client/dist")));

// ====== SIMULATED DATABASES ======
let favoritesDb = {}; // { username: [favoriteBasketIds] }
let baskets = []; // Mock database for administrator baskets

// ====== FAVORITES API ======

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

// Get all baskets
app.get("/api/administrator", (req, res) => {
  res.json(baskets);
});

// Add a new basket
app.post("/api/administrator", (req, res) => {
  const newBasket = req.body;
  newBasket.id = baskets.length + 1; // Auto-assign ID
  baskets.push(newBasket);
  res.json(baskets);
});

// Edit an existing basket
app.put("/api/administrator/:id", (req, res) => {
  const basketId = parseInt(req.params.id);
  baskets = baskets.map((b) => (b.id === basketId ? { ...b, ...req.body } : b));
  res.json(baskets);
});

// Delete a single basket
app.delete("/api/administrator/:id", (req, res) => {
  const basketId = parseInt(req.params.id);
  baskets = baskets.filter((b) => b.id !== basketId);
  res.json(baskets);
});

// Delete all baskets
app.delete("/api/administrator", (req, res) => {
  baskets = [];
  res.json(baskets);
});

// ====== SERVE REACT FRONTEND ======
// This ensures React handles frontend routes (like /favorites or /administrator)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
