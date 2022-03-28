const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
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
      default: "admin",
    },
  },
  { timestamps: true }
);
module.exports = Admin = mongoose.model("admin", AdminSchema);
