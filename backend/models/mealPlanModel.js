const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const Meal_Plan = mongoose.model(
  "meal_plans",
  new mongoose.Schema({
    _id: {
      type: ObjectIdSchema,
      default: function () {
        return new ObjectId();
      },
    },
    name: String,
    private: Boolean,
    owner: String,
    likes: Number,
    meals: [
      mongoose.Schema({
        food: mongoose.Schema({
            name: {
              type: String,
              required: true,
              unique: true
            },
            id: String
        }),
        day: String,
      })
    ]
  })
);
module.exports = Meal_Plan;
