const mongoose = require('mongoose');

const BasketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
});

const Basket = mongoose.model('Basket', BasketSchema);

module.exports = Basket;
