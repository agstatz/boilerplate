const mongoose = require("mongoose");

const FoodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  servingSize: String,
  calories: String,
  totalFat: String,
  saturatedFat: String,
  cholesterol: String,
  sodium: String,
  totalCarbohydrate: String,
  sugar: String,
  addedSugar: String,
  dietaryFiber: String,
  protein: String,
  calcium: String,
  iron: String,
  dietaryTags: [String],
  ingredients: String,
  aggregateRating: Number,
  userTags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_tags",
    },
  ],
});

module.exports = mongoose.model("foods", FoodSchema);
