const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  societies: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("Student", studentSchema);
