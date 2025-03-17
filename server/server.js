require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./connection/connection"); // MongoDB connection function
const Basket = require("./models/Basket"); // Basket model
const Favorite = require("./models/Favorite"); // Favorite model (NEW)

const app = express();
const PORT = process.env.PORT || 5050;

console.log("✅ Server is running");

// ====== ✅ MIDDLEWARE ======
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// ✅ Connect to MongoDB
connectDB();

// Serve static files for frontend
app.use(express.static(path.join(__dirname, "../client")));

// ====== ✅ PUBLIC ROUTE: GET ALL BASKETS ======
app.get("/api/baskets", async (req, res) => {
  console.log("🛠️ GET /api/baskets was called!");
  try {
    const baskets = await Basket.find({});
    res.json(baskets);
  } catch (error) {
    console.error("❌ Failed to fetch baskets:", error);
    res.status(500).json({ error: "Failed to fetch baskets" });
  }
});

// ====== ✅ ADMIN ROUTES ======
// Only Admins Can Add, Edit, Delete Baskets

// ✅ Add a new basket
app.post("/api/baskets/admin", async (req, res) => {
  try {
    const { name, content } = req.body;

    if (!name || !content) {
      return res.status(400).json({ error: "Name and content are required" });  // ✅ Prevent empty submissions
    }

    const newBasket = new Basket({ name, content });
    await newBasket.save();  // ✅ Save to MongoDB

    console.log("✅ New basket added:", newBasket);
    
    const updatedBaskets = await Basket.find();  // ✅ Get updated list
    res.json(updatedBaskets);
  } catch (error) {
    console.error("❌ Error adding basket:", error);
    res.status(500).json({ error: "Failed to add basket" });
  }
});


// ✅ Edit an existing basket
app.put("/api/baskets/admin/:id", async (req, res) => {
  try {
    await Basket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const updatedBaskets = await Basket.find();
    res.json(updatedBaskets);
  } catch (error) {
    res.status(500).json({ error: "Failed to edit basket" });
  }
});

// ✅ Delete a single basket & reorder numbers
app.delete("/api/baskets/admin/:id", async (req, res) => {
  try {
    await Basket.findByIdAndDelete(req.params.id);

    // Fetch remaining baskets and reorder their numbers
    const baskets = await Basket.find().sort({ _id: 1 });
    baskets.forEach((basket, index) => {
      basket.number = index + 1; // Ensure correct numbering
      basket.save();
    });

    res.json(baskets);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete basket" });
  }
});

// ✅ Delete all baskets (Confirmation required in frontend)
app.delete("/api/baskets/admin", async (req, res) => {
  try {
    await Basket.deleteMany({});
    res.json([]); // Send back an empty array
  } catch (error) {
    res.status(500).json({ error: "Failed to delete all baskets" });
  }
});

// ====== ✅ USER FAVORITES API (Stored in MongoDB) ======

// ✅ Get all favorites for a user
app.get("/api/:username/favorites", async (req, res) => {
  try {
    const favorites = await Favorite.find({ username: req.params.username });
    res.json(favorites.map(fav => fav.basketId));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

// ✅ Add a basket to favorites
app.post("/api/:username/favorites", async (req, res) => {
  const { basketId } = req.body;
  try {
    const newFavorite = new Favorite({ username: req.params.username, basketId });
    await newFavorite.save();
    res.json({ success: true, message: "Favorite added" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add favorite" });
  }
});

// ✅ Remove a specific favorite (Fix: No request body in DELETE)
app.delete("/api/:username/favorites/:basketId", async (req, res) => {
  try {
    await Favorite.findOneAndDelete({ username: req.params.username, basketId: req.params.basketId });
    res.json({ success: true, message: "Favorite removed" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove favorite" });
  }
});

// ✅ Remove ALL favorites for a user
app.delete("/api/:username/favorites", async (req, res) => {
  try {
    await Favorite.deleteMany({ username: req.params.username });
    res.json({ success: true, message: "All favorites removed" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove all favorites" });
  }
});

// ====== ✅ SERVE REACT FRONTEND ======
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
