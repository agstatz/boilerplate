const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
  name: {
      type: String,
      required: true,
      unique: true
  },
  servingSize: String,
  calories: Number,
  totalFat: Number,
  saturatedFat: Number,
  cholesterol: Number,
  sodium: Number,
  totalCarbs: Number,
  sugar: Number,
  addedSugar: Number,
  dietaryFiber: Number,
  protein: Number,
  calcium: Number,
  iron: Number,
  dietaryTags: [String],
  ingredients: [String]
});

module.exports = mongoose.model('food', FoodSchema);