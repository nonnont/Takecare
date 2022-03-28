const mongoose = require("mongoose");

const PsychologistSchema = new mongoose.Schema(
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
    telephone: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "psychologist",
    },
    verify: {
      type: String,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = Psychologist = mongoose.model(
  "psychologists",
  PsychologistSchema
);
