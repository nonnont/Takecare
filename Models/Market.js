const mongoose = require("mongoose");

const MarketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    lassname: {
      type: String,
    },
    expert: [],
    education: {
      type: String,
    },
    email: {
      type: String,
    },
    telephone: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    period: {
      type: String,
    },
    price: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = Market = mongoose.model("markets", MarketSchema);
