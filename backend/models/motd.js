const mongoose = require("mongoose");

const MotD = mongoose.model(
  "motds",
  new mongoose.Schema({
    name: String,
    isHidden: Boolean,
    contents: String,
  })
);

module.exports = MotD;