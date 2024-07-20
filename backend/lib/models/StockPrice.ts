const mongoose = require('mongoose');

const stockPriceSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

export const StockPrice = mongoose.model('StockPrice', stockPriceSchema);
