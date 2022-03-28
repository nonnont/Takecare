const mongoose = require("mongoose");

const NotebookSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = Notebook = mongoose.model("notebook", NotebookSchema);
