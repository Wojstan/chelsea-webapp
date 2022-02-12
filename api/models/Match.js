const mongoose = require("mongoose");

const MatchSchema = mongoose.Schema({
  _id: Number,
  lineup: { type: Array, default: [] },
  events: { type: Array, default: [] },
});

module.exports = mongoose.model("Match", MatchSchema);
