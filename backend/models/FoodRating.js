const mongoose = require("mongoose");


const FoodRatingSchema = mongoose.model(
    "food_rating",
    new mongoose.Schema({
        ownerName: String,
        food: String,
        rating: Number
    })
   
);


module.exports = FoodRatingSchema;