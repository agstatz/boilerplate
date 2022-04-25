const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const Meal_Plan = mongoose.model(
  "meal_plan",
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
        [
            {
                foods: [
                    {
                        key: Number,
                        name: String,
                        food_qty: Number,
                    }
                ],
                key: Number,
                location: String,
                name: String,
              },
        ],
    ],
  })
);
module.exports = Meal_Plan;
