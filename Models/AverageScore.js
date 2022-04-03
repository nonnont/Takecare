const mongoose = require("mongoose");

const AverageScorechema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    score1: {
      type: Number,
    },
    score2: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = AverageScore = mongoose.model(
  "average_score",
  AverageScorechema
);
