const mongoose = require("mongoose");

const MeetSchema = new mongoose.Schema(
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

    idCallUser: {
      type: String,
      default: "",
    },
    idCallPsycho: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = Meet = mongoose.model("meets", MeetSchema);
