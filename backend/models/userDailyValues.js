const mongoose = require("mongoose");

const userDailyValues = mongoose.model(
    "user_daily_values",
    new mongoose.Schema({
        isDefault: Boolean,
        username: String,
        calories: Number,
        totalFat: Number,
        saturatedFat: Number,
        cholesterol: Number,
        sodium: Number,
        totalCarbohydrate: Number,
        addedSugar: Number,
        dietaryFiber: Number,
        protein: Number,
        calcium: Number,
        iron: Number,
    })
  );

module.exports = userDailyValues;
