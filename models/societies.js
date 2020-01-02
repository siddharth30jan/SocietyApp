const mongoose = require("mongoose");

const societySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  notifs: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("Society", societySchema);
