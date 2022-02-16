const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
  last: { type: String, required: true },
  number: { type: Number, required: true },

})


module.exports = mongoose.model('Player', PlayerSchema);