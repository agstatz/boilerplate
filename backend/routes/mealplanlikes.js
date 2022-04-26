const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Meal_Plan_Like = require("../models/mealPlanLike");
const mongoose = require("mongoose");



// @route   GET api/meal-plan-like
// @desc    Get a specific meal plan like
// @access  Public
router.get("/", async (req, res) => {
    try {
      const queryMealPlan = req.query.mealplan;
      const queryUser = req.query.user;

      if (queryMealPlan && queryUser) {
          // get a specific meal plan like
        Meal_Plan_Like.findOne({ownerName: queryUser, mealPlan: queryMealPlan}).exec((err, mealPlanLike) => {
            if (err) {
              Meal_Plan_Like.create({
                  ownerName: queryUser,
                  mealPlan: queryMealPlan,
                  like: false,
              });
            }
  
            if (!mealPlanLike) {
                Meal_Plan_Like.create({
                    ownerName: queryUser,
                    mealPlan: queryMealPlan,
                    like: false,
                });
            }
  
            res.status(200).send(mealPlanLike);
        });
      } else {
        // get a group of meal plan likes
        if (queryUser) {
            Meal_Plan_Like.find({ownerName: queryUser}).exec((err, mealPlanLike) => {
                if (err) {
                    res.status(500).send("Server error");
                }

                res.status(200).send(mealPlanLike);
            });
        } 
      }
  
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });



// @route   PUT api/meal-plan-like
// @desc    update an existing meal plan like by username and mealplan
// @access  Public
router.put("/", async (req, res) => {
    const queryMealPlan = req.query.mealplan;
    const queryUser = req.query.user;
    const queryLike = req.query.like;
    
    try {
  
      Meal_Plan_Like.findOne({ownerName: queryUser, mealPlan: queryMealPlan}).exec((err, mealPlanLike) => {
          
          if (!mealPlanLike) {
              Meal_Plan_Like.create({
                  ownerName: queryUser,
                  mealPlan: queryMealPlan,
                  like: false,
              });
              res.send({ message: "Updated successfully." });
              return;
          } else {
            
    
              const id = mealPlanLike._id;
              
              const filter = {ownerName: queryUser, mealPlan: queryMealPlan};

              const updateDoc = {
                  $set: {
                    ownerName: queryUser,
                    mealPlan: queryMealPlan,
                    like: queryLike,
                  },
              };

              Meal_Plan_Like.updateOne(filter, updateDoc).exec((err, mealPlanLike2) => {
                  mealPlanLike.save((err2, mealPlanLike3) => {
                      if (err2) {
                          res.status(500).send({ message: err2});
                          return;
                      }
                  });
              });
                
              res.send({ message: "Updated successfully." });
          }});
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  module.exports = router;
