const mongoose = require("mongoose");
const Meal_Schema =   new mongoose.Schema({
  food: 
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "foods"
      }
  ,
  day: String,
})
const Meals = mongoose.model(
  "meals", Meal_Schema

);
module.exports = {Meals, Meal_Schema};