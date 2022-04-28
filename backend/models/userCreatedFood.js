const mongoose = require("mongoose");

const userCreatedFood = mongoose.model(
    "user_foods",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        username: String,
        servingSize: String,
        calories: Number,
        totalFat: Number,
        saturatedFat: Number,
        cholesterol: Number,
        sodium: Number,
        totalCarbohydrate: Number,
        sugar: Number,
        addedSugar: Number,
        dietaryFiber: Number,
        protein: Number,
        calcium: Number,
        iron: Number,
    })
  );

module.exports = userCreatedFood;
