const dbm = require("../models");
const FoodTag = require("../models/userTagModel");
const Users = require("../models/userModel");
const Food = require("../models/Food");
const mongoose = require("mongoose");
const FoodRating = require("../models/FoodRating");

// Will add a user tag, or if it already exists, it will add the tag to the selected food, or
// if the food already has that tag, it will increase the tag's ranking
// requests should have format ::: "data": {"username": <name of user>, foodName: <name of food for tag>
// , foodTagName: <name of tag>}
exports.addUserCreatedTag = (req, res) => {
  Food.findOne({
    name: req.body.data.foodName,
  }).exec((err, food) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!food) {
      // food doesn't exist
      res.status(500).send({ message: "target food doesn't exist" });
      return;
    }
    FoodTag.findOne({
      name: req.body.data.foodTagName,
      food: food._id,
    }).exec((err2, foodTag) => {
      if (err2) {
        res.status(500).send({ message: err2 });
        return;
      }
      if (!foodTag) {
        // food tag doesn't exist
        Users.findOne({
          username: req.body.data.username,
        }).exec((err3, user) => {
          if (err3) {
            res.status(500).send({ message: err3 });
            return;
          }
          if (!user) {
            // user doesn't exist
            res.status(500).send({ message: "target user doesn't exist" });
            return;
          } else {
            const newFoodTag = new FoodTag({
              name: req.body.data.foodTagName,
              rating: 1,
              food: food._id,
              users: [],
            });
            newFoodTag.users.push(user._id);
            newFoodTag.save((err4, foodTag2) => {
              // save new food tag
              if (err4) {
                res.status(500).send({ message: err4 });
                return;
              }
              food.userTags.push(foodTag2._id);
              food.save((err5, food2) => {
                // connect food to tag on food
                if (err5) {
                  res.status(500).send({ message: err5 });
                  return;
                }
              });
              user.userTags.push(foodTag2._id);
              user.save((err5, user2) => {
                // connect user to tag on user
                if (err5) {
                  res.status(500).send({ message: err5 });
                  return;
                }
              });
            }); // end save new food tag
          }
        });
      } else {
        // food tag does exist
        Users.findOne({
          username: req.body.data.username,
        }).exec((err3, user) => {
          if (err3) {
            res.status(500).send({ message: err3 });
            return;
          }
          if (!user) {
            // food doesn't exist
            res.status(500).send({ message: "target user doesn't exist" });
            return;
          }
          FoodTag.findOne({
            name: req.body.data.foodTagName,
            food: food._id,
            users: user._id,
          }).exec((err10, foodTagMatch) => {
            if (err10) {
              res.status(500).send({ message: err3 });
              return;
            }
            if (!foodTagMatch) {
              // food doesn't exist
              // increment rating value on tag
              var filter = { name: foodTag.name, food: foodTag.food };
              let x = foodTag.rating + 1;
              var updateDoc = {
                $set: {
                  rating: x,
                },
              };
              FoodTag.updateOne(filter, updateDoc).exec((err3, foodTag4) => {
                foodTag.users.push(user._id);
                foodTag.save((err7, foodTag3) => {
                  if (err7) {
                    res.status(500).send({ message: err7 });
                    return;
                  }
                });
                user.userTags.push(foodTag._id);
                user.save((err7, user2) => {
                  // connect tag to user on user
                  if (err7) {
                    res.status(500).send({ message: err7 });
                    return;
                  }
                });
              });
            } else {
              //res.status(406).send({ message: "This user has already posted with this food-tag combo" });
              return;
            }
          });
        });
      }
      res.send({ message: "Successful post request." });
    });
  });
};

// Allows for editing a given food rating
exports.editFoodRating = async (req, res) => {
  console.log("editing food rating");
  try {
    FoodRating.findOne({
      ownerName: req.body.data.ownerName,
      food: req.body.data.foodName,
    }).exec((err, foodRating) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!foodRating) {
        return res.status(404).send({ message: "User Not found" });
      }

      var filter = { ownerName: foodRating.ownerName, food: foodRating.food };
      var updateDoc = {
        $set: {
          rating: req.body.data.rating,
        },
      };
      FoodRating.updateOne(filter, updateDoc).exec((err3, foodRating2) => {
        foodRating.save((err7, foodRating3) => {
          if (err7) {
            res.status(500).send({ message: err7 });
            return;
          }
        });
      });
    });

    //res.send({ message: "Food Rating edited successfully." });
  } catch (err) {
    console.log("error encountered");
    res.status(500).send({ message: "An error was encountered." });
    return;
  }
};

// Allows for editing a given food rating
exports.getFoodRating = async (req, res) => {
  const queryFood = req.query.food.split("_").join(" ");
  const queryUser = req.query.user;
  try {
    FoodRating.findOne({ ownerName: queryUser, food: queryFood }).exec(
      (err, foodRating) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!foodRating) {
          console.log("eror1");
          FoodRating.create(
            { ownerName: queryUser, food: queryFood, rating: 0 },
            function (err, newFoodRating) {
              if (err) return handleError(err);
              // saved!
            }
          );
          //res.status(404).send({ message: "not found" });
          return;
        }

        res.status(200).send(foodRating);
        return;
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
