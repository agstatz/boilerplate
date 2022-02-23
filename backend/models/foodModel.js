const mongoose = require("mongoose");
const Food = mongoose.model(
  "foods",
  new mongoose.Schema({
    _id: String,
    name: String,
  })
);
module.exports = Food;