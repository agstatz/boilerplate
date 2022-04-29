const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationsVisitedSchema = new Schema(
  {
    mostRecentRating: Number,
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "locations",
    },
    visits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "visits",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "replies",
      },
    ],
  },
  { _id: false }
);

const User = mongoose.model(
  "users",
  new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    lightMode: Boolean,
    carbOpt: Boolean,
    starNotifs: Boolean,
    newMenuNotifs: Boolean,
    mealSwipes: Number,
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    diets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food_categories",
      },
    ],
    allergies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food_categories",
      },
    ],
    locationStars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "locations",
      },
    ],
    foodStars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foods",
      },
    ],
    foodBlacklist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foods",
      },
    ],
    intakePlans: {
        _id: String,
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
    },
    mealPlans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "meal_plans",
      },
    ],
    privilegeClasses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "privilege_classes",
      },
    ],
    userTags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user_tags",
      },
    ],
    favoriteFoods: [
      {
        type: mongoose.Schema.Types.String,
        ref: "favoriteFoods",
      },
    ],
    locationsVisited: [locationsVisitedSchema],
    tried: [
        {
            type: mongoose.Schema.Types.String
        }
    ]
  })
);
module.exports = User;
