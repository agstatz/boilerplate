const mongoose = require("mongoose");

const MealPlanLikeSchema = mongoose.model(
  "meal_plan_like",
  new mongoose.Schema({
    ownerName: String,
    mealPlan: String,
    like: Boolean,
  })
);

module.exports = MealPlanLikeSchema;
