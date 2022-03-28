const mongoose = require("mongoose");

const CancelCallSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);
module.exports = CancelCall = mongoose.model("cancelcalls", CancelCallSchema);
