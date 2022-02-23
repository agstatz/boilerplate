const mongoose = require("mongoose");
const Meals = mongoose.model(
  "meals",
  new mongoose.Schema({
    food: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "foods"
        }
    ],
    day: String,
  })
);
module.exports = Meals;