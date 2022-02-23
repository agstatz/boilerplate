const mongoose = require("mongoose");
const Meal_Plan = mongoose.model(
  "meal_plans",
  new mongoose.Schema({
    _id: String,
    name: String,
    private: Boolean,
    owner_id: String,
    likes: Integer,
    meals: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "meals"
          }
        ]
  })
);
module.exports = MealPlan;