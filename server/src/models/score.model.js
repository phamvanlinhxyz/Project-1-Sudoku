const mongoose = require("mongoose");

const Score = new mongoose.Schema(
  {
    username: { type: String, required: true },
    solveTime: { type: Number, required: true },
    level: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("scores", Score);
