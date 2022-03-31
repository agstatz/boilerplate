const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Meal_Plan = require("../models/mealPlanModel");
const mongoose = require("mongoose");

// @route   GET api/meal-plans
// @desc    Get all meal-plans from collection
// @access  Public
router.get("/", async (req, res) => {
  try {
    const mealplans = await Meal_Plan.find(); // Get all foods
    res.json(mealplans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/meal-plans/:id
// @desc    Get a specific meal plan via id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const mealplan = await Meal_Plan.findById(req.params.id);

    if (!mealplan)
      return res.status(400).json({ msg: "Meal Plan does not exist" });

    res.json(mealplan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/meal-plans
// @desc    set a new meal-plan
// @access  Public
router.post("/", async (req, res) => {
  console.log("got:\n");
  console.log(req.body);
  const plan_id = new mongoose.Types.ObjectId();
  try {
    const meal_plan = new Meal_Plan({
      _id: plan_id,
      name: req.body.name,
      private: req.body.private,
      owner: req.body.owner,
      likes: req.body.likes,
      meals: req.body.schedule,
    });
    meal_plan.save((err, user) => {
      if (err) {
        console.error(err.message);
        res.status(500).send({ message: err });
      }
      res.send({ message: "Updated successfully." });
      console.log("saved");
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

  try {
    User.updateOne(
      {
        username: req.body.owner,
      },
      {
        $push: { mealPlans: plan_id },
      },
      (err, success) => {
        if (err) {
          console.error(err.message);
          res.status(500).send({ message: err });
        }
        console.log("updated meal_plans");
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/meal-plans/:id
// @desc    update an existing meal plan by id
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const mealplan = await Meal_Plan.findById(req.params.id);
    if (!mealplan)
      return res.status(400).json({ msg: "Meal Plan does not exist" });

    const filter = { _id: req.params.id };

    const updateDoc = {
      $set: {
        name: req.body.name,
        private: req.body.private,
        owner: req.body.owner,
        likes: req.body.likes,
        meals: [],
      },
    };

    const result = await Meal_Plan.updateOne(filter, updateDoc);

    mealplan.save((err, user) => {
      if (err) {
        console.error(err.message);
        res.status(500).send({ message: err });
      }
      res.send({ message: "Updated successfully." });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
