const dbm = require("../models");
const FoodTag = require("../models/userTagModel");
const Users = require("../models/userModel");
const Food = require("../models/Food");
const mongoose = require('mongoose');

// Will add a user tag, or if it already exists, it will add the tag to the selected food, or
// if the food already has that tag, it will increase the tag's ranking
// requests should have format ::: "data": {"username": <name of user>, foodName: <name of food for tag>
// , foodTagName: <name of tag>}
exports.addUserCreatedTag = (req, res) => {
    Food.findOne({
        name: req.body.data.foodName
    }).exec((err, food) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!food) { // food doesn't exist
            res.status(500).send({ message: "target food doesn't exist" });
            return;
        }
        FoodTag.findOne({
            name: req.body.data.foodTagName,
            food: food._id
        }).exec((err2, foodTag) => {
            if (err2) {
                res.status(500).send({ message: err2 });
                return;
            }
            if (!foodTag) { // food tag doesn't exist
                Users.findOne({
                    username: req.body.data.username
                }).exec((err3, user) => {
                    if (err3) {
                        res.status(500).send({ message: err3 });
                        return;
                    }
                    if (!user) { // user doesn't exist
                        res.status(500).send({ message: "target user doesn't exist" });
                        return;
                    }
                    else {
                        const newFoodTag = new FoodTag({
                            name: req.body.data.foodTagName,
                            rating: 1,
                            food: food._id,
                            users: []
                        });
                        newFoodTag.users.push(user._id);
                        newFoodTag.save((err4, foodTag2) => { // save new food tag
                            if (err4) {
                                res.status(500).send({ message: err4 });
                                return;
                            }
                            food.userTags.push(foodTag2._id);
                            food.save((err5, food2) => { // connect food to tag on food
                                if (err5) {
                                    res.status(500).send({ message: err5 });
                                    return;
                                }
                            });
                            user.userTags.push(foodTag2._id);
                            user.save((err5, user2) => { // connect user to tag on user
                                if (err5) {
                                    res.status(500).send({ message: err5 });
                                    return;
                                }
                            });
                        }); // end save new food tag
                    }
                })
            }
            else { // food tag does exist
                Users.findOne({
                    username: req.body.data.username
                }).exec((err3, user) => {
                    if (err3) {
                        res.status(500).send({ message: err3 });
                        return;
                    }
                    if (!user) { // food doesn't exist
                        res.status(500).send({ message: "target user doesn't exist" });
                        return;
                    }
                    FoodTag.findOne({
                        name: req.body.data.foodTagName,
                        food: food._id,
                        users: user._id
                    }).exec((err10, foodTagMatch) => {
                        if (err10) {
                            res.status(500).send({ message: err3 });
                            return;
                        }
                        if (!foodTagMatch) { // food doesn't exist
                            // increment rating value on tag
                            var filter = { name: foodTag.name, food: foodTag.food };
                            let x = foodTag.rating + 1;
                            var updateDoc = {
                                $set: {
                                    rating: x
                                }
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
                                user.save((err7, user2) => { // connect tag to user on user
                                    if (err7) {
                                        res.status(500).send({ message: err7 });
                                        return;
                                    }
                                });
                            });
                        }
                        else {
                            //res.status(406).send({ message: "This user has already posted with this food-tag combo" });
                            return;
                        }
                    })
                })
            }
            res.send({ message: "Successful post request."});
        })
    })
}