const mongoose = require("mongoose");

// Rating is user for user-created tags to function as a rating tool for the accuracy of the tag
const Food_Tag = mongoose.model(
    "food_categories",
    new mongoose.Schema({
    name: String,
    tagType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food_tag_types"
    },
    foods: [
        {
            food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "foods"
            },
            rating: Number,
        }
    ]
}));

module.exports = Food_Tag;