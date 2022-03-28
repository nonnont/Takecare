const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    lassname: {
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
      default: "user",
    },
    score_stress: {
      type: String,
      default: "null",
    },
    score_depression: {
      type: String,
      default: "null",
    },
    score_suicide: {
      type: String,
      default: "null",
    },
    meet: {},
  },
  { timestamps: true }
);
module.exports = User = mongoose.model("users", UserSchema);
