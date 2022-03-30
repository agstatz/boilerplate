const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const Meal = mongoose.model(
  "meal",
  new mongoose.Schema({
    _id: {
      type: ObjectIdSchema,
      default: function () {
        return new ObjectId();
      },
    },
    food: mongoose.Schema({
        name: String,
        id: String
    }),
    day: String,
  })
);
module.exports = Meal;
