const mongoose = require("mongoose");

const HistoryCallSchema = new mongoose.Schema(
  {
    //   Psychologist
    namePsycho: {
      type: String,
    },
    lassnamePsycho: {
      type: String,
    },
    emailPsycho: {
      type: String,
    },
    telephonePsycho: {
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

    // User
    nameUser: {
      type: String,
    },
    lassnameUser: {
      type: String,
    },
    emailUser: {
      type: String,
    },

    datail: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = HistoryCall = mongoose.model(
  "historycalls",
  HistoryCallSchema
);
