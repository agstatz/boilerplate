const dbm = require("../models");
const FoodTag = require("../models/foodTagsModel");
const Food = require("../models/Food");

exports.addUserCreatedTag = (req, res) => {
    FoodTag.findOne({
      name: req.body.data.name
    }).exec((err, tag) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!tag) { // Tag doesn't exist, need to instantiate it
        var targetFood = Food.findOne({ name: req.body.data.foodName });
        const foodTag = new FoodTag({
          name: req.body.data.name,
          tagType: "user-created",
          foods: [ {food: targetFood, rating: 1} ]
        });
        foodTag.save((err, tag) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
        targetFood.foodTags.push(foodTag);
        return;
      }
      else { // The tag already exists
        var foodTag = FoodTag.findOne({ name: req.body.data.name, tagType: "user-created" })
        var targetFood = Food.findOne({ name: req.body.data.foodName, foodTags: foodTag });
        if (targetFood) { // Food already has a tag, need to increment rating
          FoodTag.findOneAndUpdate({ name: req.body.data.name, tagType: "user-created"
                , 'foods.food': targetFood}, {$inc: {'foods.rating': 1}} );
          return;
        } // Food does not have the tag, but the tag already exists for other food
        foodTag.foods.push({ food: targetFood, rating: 1})
        foodTag.save((err, tag) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
        targetFood.foodTags.push(foodTag);
        return;
      }
    });
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
};