const mongoose = require("mongoose");

const matchSchema = mongoose.Schema({
  date: Date,
  blueScore: Number,
  redScore: Number,
  winner: String,
  participants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: String,
    },
  ],
});

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;