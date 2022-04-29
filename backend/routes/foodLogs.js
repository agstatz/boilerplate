const express = require("express");
const router = express.Router();
const Daily_Values = require("../models/userDailyValues");
const User = require("../models/userModel");
const mongoose = require("mongoose");


// @route   GET api/foods
// @desc    Get all food items from collection.
// @access  Public
router.get("/dailyvalues/exists/:username", async (req, res) => {
    try {
        const match = await User.findOne({ username: req.params.username });
        if (!match) {
          return res.status(400).json({ msg: "User not found" });
        }
        const match2 = await Daily_Values.findOne({ username: req.params.username });
        if (match2) {
            res.send({ message: true });
        }
        else {
            res.send({ message: false });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.get("/dailyvalues/values/:username", async (req, res) => {
    try {
        const dailyValues_id = new mongoose.Types.ObjectId();
        const match = await User.findOne({ username: req.params.username });
        if (!match) {
          return res.status(400).json({ msg: "User not found" });
        }
        const match2 = await Daily_Values.findOne({ username: req.params.username });
        var dailyValues;
        if (match2) {
            dailyValues = new Daily_Values({
                _id: dailyValues_id,
                username: req.params.username,
                isDefault: false,
                calories: match2.calories,
                totalFat: match2.totalFat,
                saturatedFat: match2.saturatedFat,
                cholesterol: match2.cholesterol,
                sodium: match2.sodium,
                totalCarbohydrate: match2.totalCarbohydrate,
                addedSugar: match2.addedSugar,
                dietaryFiber: match2.dietaryFiber,
                protein: match2.protein,
                calcium: match2.calcium,
                iron: match2.iron,
            });
        }
        else {
            dailyValues = new Daily_Values({
                _id: dailyValues_id,
                username: req.params.username,
                isDefault: true,
                calories: 2000,
                totalFat: 78,
                saturatedFat: 20,
                cholesterol: 300,
                sodium: 2300,
                totalCarbohydrate: 275,
                addedSugar: 50,
                dietaryFiber: 28,
                protein: 50,
                calcium: 1300,
                iron: 18,
            });
        }
        res.send({ dailyValues });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/dailyvalue", async (req, res) => {
  const dailyValues_id = new mongoose.Types.ObjectId();
  const match = await User.findOne({ username: req.body.data.username });
  if (!match) {
    return res.status(400).json({ msg: "User not found" });
  }
  const match2 = await Daily_Values.findOne({ username: req.body.data.username });
  if (match2) {
    return res.status(400).json({ msg: "Daily Values already exists for user" });
  }
  else {
    try {
      var dailyValues;
      if (req.body.data.isDefault === false) {
        dailyValues = new Daily_Values({
          _id: dailyValues_id,
          username: req.body.data.username,
          isDefault: false,
          calories: req.body.data.calories,
          totalFat: req.body.data.totalFat,
          saturatedFat: req.body.data.saturatedFat,
          cholesterol: req.body.data.cholesterol,
          sodium: req.body.data.sodium,
          totalCarbohydrate: req.body.data.totalCarbohydrate,
          addedSugar: req.body.data.addedSugar,
          dietaryFiber: req.body.data.dietaryFiber,
          protein: req.body.data.protein,
          calcium: req.body.data.calcium,
          iron: req.body.data.iron,
        });
      } else {
        dailyValues = new Daily_Values({
          _id: dailyValues_id,
          username: req.body.data.username,
          isDefault: true,
          calories: 2000,
          totalFat: 78,
          saturatedFat: 20,
          cholesterol: 300,
          sodium: 2300,
          totalCarbohydrate: 275,
          addedSugar: 50,
          dietaryFiber: 28,
          protein: 50,
          calcium: 1300,
          iron: 18,
        });
      }
      dailyValues.save((err, user) => {
        if (err) {
          console.error(err.message);
          res.status(500).send({ message: err });
        }
        res.send({ message: "Saved successfully." });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
});

router.put("/dailyvalue", async (req, res) => {
  try {
    const dailyValues_id = new mongoose.Types.ObjectId();
    const match = await User.findOne({ username: req.body.data.username });
    if (!match) {
      return res.status(400).json({ msg: "User not found" });
    }
    const match2 = await Daily_Values.findOne({ username: req.body.data.username });
    if (!match2) {
      return res.status(400).json({ msg: "Daily Values not found for user" });
    }
    else {

      const filter = { username: req.body.data.username };

      var updateDoc;
      if (req.body.data.isDefault === true) {
          updateDoc = {
              $set: {
                  isDefault: true,
                  calories: 2000,
                  totalFat: 78,
                  saturatedFat: 20,
                  cholesterol: 300,
                  sodium: 2300,
                  totalCarbohydrate: 275,
                  addedSugar: 50,
                  dietaryFiber: 28,
                  protein: 50,
                  calcium: 1300,
                  iron: 18,
              },
            };
      }
      else {
          updateDoc = {
              $set: {
                isDefault: false,
                calories: req.body.data.calories,
                totalFat: req.body.data.totalFat,
                saturatedFat: req.body.data.saturatedFat,
                cholesterol: req.body.data.cholesterol,
                sodium: req.body.data.sodium,
                totalCarbohydrate: req.body.data.totalCarbohydrate,
                addedSugar: req.body.data.addedSugar,
                dietaryFiber: req.body.data.dietaryFiber,
                protein: req.body.data.protein,
                calcium: req.body.data.calcium,
                iron: req.body.data.iron,
              },
            };
      }

      const result = await Daily_Values.updateOne(filter, updateDoc);

      match2.save((err, motdr) => {
        if (err) {
          console.error(err.message);
          res.status(500).send({ message: err });
        }
        res.send({ message: "Updated successfully." });
      });
  }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
