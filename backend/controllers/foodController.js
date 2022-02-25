const dbm = require("../models");
const FoodTag = require("../models/foodTagsModel");
const Food = require("../models/Food");

// Will add a user tag, or if it already exists, it will add the tag to the selected food, or
// if the food already has that tag, it will increase the tag's ranking
// requests should have format ::: "data": {"name": <name of tag>, foodName: <name of food for tag>}
exports.addUserCreatedTag = (req, res) => {
  FoodTag.findOne({
    name: req.body.data.name
  }).exec((err, tag) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!tag) { // Tag doesn't exist, need to instantiate it
      Food.findOne({ name: req.body.data.foodName }).exec((err2, targetFood) => {
        const foodTag = new FoodTag({
          name: req.body.data.name,
          tagType: "user-created",
          foods: [ {food: targetFood, rating: 1} ]
        });
        foodTag.save((err3, tag2) => {
          if (err) {
            res.status(500).send({ message: err3 });
            return;
          }
        });
        targetFood.foodTags.push(foodTag);
        console.log(targetFood);
        targetFood.save((err3, tag2) => {
          if (err) {
            res.status(500).send({ message: err3 });
            return;
          }
        });
        return;
      });
    }
    else { // The tag already exists
      FoodTag.findOne({ name: req.body.data.name, tagType: "user-created" }).exec((err2, foodTag) => {
        Food.findOne({ name: req.body.data.foodName, foodTags: foodTag._id }).exec((err3, targetFood) => {
          if (targetFood) { // Food already has a tag, need to increment rating
            //ft = foodTag.foods.name(req.body.data.foodName);
            //ft["rating"] =
            FoodTag.findOneAndUpdate({ name: req.body.data.name, tagType: "user-created"
                , 'foods.food': targetFood}, {$inc: {'foods.rating': 1}} );
            return;
          } // Food does not have the tag, but the tag already exists for other food
          Food.findOne({ name: req.body.data.foodName }).exec((err4, targetFood2) => {
            foodTag.foods.push({ food: targetFood2, rating: 1});
            console.log(foodTag);
            foodTag.save((err5, tag3) => {
              if (err4) {
                res.status(500).send({ message: err5 });
                return;
              }
            });
            console.log(targetFood2);
            targetFood2.foodTags.push(foodTag);
            targetFood2.save((err5, tag3) => {
              if (err4) {
                res.status(500).send({ message: err5 });
                return;
              }
            });
          });
        });
      });
    }
    return;
  });
};