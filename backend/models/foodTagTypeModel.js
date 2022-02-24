const mongoose = require("mongoose");
const Food_Tag_Type = mongoose.model(
  "food_tag_types",
  new mongoose.Schema({
    name: String
  })
);
module.exports = Food_Tag_Type;