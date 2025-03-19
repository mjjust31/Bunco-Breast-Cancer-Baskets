const mongoose = require("mongoose");

const BasketSchema = new mongoose.Schema({
  basketNumber: { type: Number, unique: true }, // ✅ Unique number for each basket
  name: { type: String, required: true },
  content: { type: String, required: true },
});

// Middleware to auto-increment basketNumber
BasketSchema.pre("save", async function (next) {
  if (!this.basketNumber) {
    const lastBasket = await mongoose.model("Basket").findOne().sort({ basketNumber: -1 });
    this.basketNumber = lastBasket ? lastBasket.basketNumber + 1 : 1;
  }
  next();
});

const Basket = mongoose.model("Basket", BasketSchema);
module.exports = Basket;
