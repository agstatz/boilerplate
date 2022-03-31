const mongoose = require("mongoose");

const User_Tag = mongoose.model(
  "user_tags",
  new mongoose.Schema({
    name: String,
    rating: Number,
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foods",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  })
);

module.exports = User_Tag;
