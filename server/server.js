require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./connection/connection"); // MongoDB connection
const Basket = require("./models/Basket"); // Basket Model
const Favorite = require("./models/Favorite"); // Favorite Model

const app = express();
const PORT = process.env.PORT || 5050;

console.log("✅ Server is running");

// ====== ✅ MIDDLEWARE ======
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../client")));

// ====== ✅ PUBLIC ROUTES ======

// ✅ Get all baskets (Public)
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

// ✅ Add a new basket
app.post("/api/baskets/admin", async (req, res) => {
  try {
    const { name, content } = req.body;
    if (!name || !content) {
      return res.status(400).json({ error: "Name and content are required" });
    }

    const newBasket = new Basket({ name, content });
    await newBasket.save();
    
    const updatedBaskets = await Basket.find();
    res.json(updatedBaskets);
  } catch (error) {
    console.error("❌ Error adding basket:", error);
    res.status(500).json({ error: "Failed to add basket" });
  }
});

// ✅ Edit an existing basket
app.put("/api/baskets/admin/:id", async (req, res) => {
  try {
    const updatedBasket = await Basket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBasket) {
      return res.status(404).json({ error: "Basket not found" });
    }

    const updatedBaskets = await Basket.find();
    res.json(updatedBaskets);
  } catch (error) {
    res.status(500).json({ error: "Failed to edit basket" });
  }
});

// ✅ Delete a single basket & remove from favorites
app.delete("/api/baskets/admin/:id", async (req, res) => {
  try {
    const basket = await Basket.findById(req.params.id);
    if (!basket) {
      return res.status(404).json({ error: "Basket not found" });
    }

    await Favorite.deleteMany({ basketId: req.params.id }); // ✅ Remove favorites related to this basket
    await Basket.findByIdAndDelete(req.params.id);

    // Fetch remaining baskets and reorder their numbers
    const baskets = await Basket.find().sort({ _id: 1 });
    for (let i = 0; i < baskets.length; i++) {
      baskets[i].number = i + 1; // ✅ Ensure correct numbering
      await baskets[i].save();
    }

    res.json(baskets);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete basket" });
  }
});

// ✅ Delete all baskets & clear all favorites
app.delete("/api/baskets/admin", async (req, res) => {
  try {
    await Basket.deleteMany({});
    await Favorite.deleteMany({}); // ✅ Remove all favorites
    res.json([]); // Send back an empty array
  } catch (error) {
    res.status(500).json({ error: "Failed to delete all baskets" });
  }
});

// ====== ✅ USER FAVORITES API (Stored in MongoDB) ======

// ✅ Get all favorite baskets for a user
app.get("/api/favorites/:username", async (req, res) => {
  try {
    const favorites = await Favorite.find({ username: req.params.username }).populate("basketId");

    if (!favorites || favorites.length === 0) {
      return res.json([]); // ✅ Return empty array instead of `undefined`
    }

    // ✅ Transform the response to ensure correct structure
    const formattedFavorites = favorites.map(fav => ({
      _id: fav.basketId?._id || null,      // ✅ Use basket's _id, ensure it's not undefined
      name: fav.basketId?.name || "Unknown Basket",    // ✅ Get basket name safely
      content: fav.basketId?.content || "No content available" // ✅ Get basket content safely
    }));

    res.json(formattedFavorites); // ✅ Send full basket details
  } catch (error) {
    console.error("❌ Failed to fetch favorites:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

app.post("/api/favorites/:username", async (req, res) => {
  try {
    const { basketId } = req.body;  // ✅ Only extract `basketId` from the body
    const username = req.params.username;  // ✅ Extract `username` from the URL

    if (!basketId || !username) {
      return res.status(400).json({ error: "Username and Basket ID are required" });
    }

    // ✅ Check if the basket is already a favorite
    const existingFavorite = await Favorite.findOne({ username, basketId });
    if (existingFavorite) {
      return res.status(400).json({ error: "Basket is already favorited" });
    }

    // ✅ Save to MongoDB
    const newFavorite = new Favorite({ username, basketId });
    await newFavorite.save();

    res.json({ success: true, message: "Favorite added", basketId });
  } catch (error) {
    console.error("❌ Failed to add favorite:", error);
    res.status(500).json({ error: "Failed to add favorite" });
  }
});


// ✅ Remove a specific favorite
app.delete("/api/favorites/:username/:basketId", async (req, res) => {
  try {
    const removedFavorite = await Favorite.findOneAndDelete({
      username: req.params.username,
      basketId: req.params.basketId,
    });

    if (!removedFavorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    res.json({ success: true, message: "Favorite removed" });
  } catch (error) {
    console.error("❌ Failed to remove favorite:", error);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
});

// ✅ Remove ALL favorites for a user
app.delete("/api/favorites/:username", async (req, res) => {
  try {
    await Favorite.deleteMany({ username: req.params.username });
    res.json({ success: true, message: "All favorites removed" });
  } catch (error) {
    console.error("❌ Failed to remove all favorites:", error);
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
