const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  username: { type: String, required: true },
  basketId: { type: mongoose.Schema.Types.ObjectId, ref: "Basket", required: true },
});

module.exports = mongoose.model("Favorite", FavoriteSchema);
