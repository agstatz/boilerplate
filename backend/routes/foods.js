const express = require("express");
const router = express.Router();
const Food = require("../models/Food");
const Food_Tag = require("../models/foodTagsModel");
const User_Tag = require("../models/userTagModel");
const User_Created_Food = require("../models/userCreatedFood");
const mongoose = require("mongoose");


// @route   GET api/foods
// @desc    Get all food items from collection.
// @access  Public
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find(); // Get all foods
    res.json(foods);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/recommendations/", async (req, res) => {
  try {
    const foods = await Food.find(); // Get all foods
    let ret = [];
    for (let i = 0; i < 5; i++) {
      food = foods[Math.floor(Math.random() * foods.length)];
      ret.push({
        name: food.name,
        nutrition: `${food.calories} calories,\n 
                ${food.totalFat}g fat,\n
                 ${food.totalCarbohydrate}g carbs,\n
                  ${food.protein}g protein`,
      });
    }
    res.json(ret);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/restrictions/:restrictions", async (req, res) => {
  console.log("here");
  console.log(req.params.restrictions);
  const restrictions = req.params.restrictions.split(",");
  console.log(restrictions);
  try {
    const foods = await Food_Tag.find({
      _id: { $in: req.params.restrictions },
    });
    res.json(foods);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/foods/:id
// @desc    Get single food item from collection.
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) return res.status(400).json({ msg: "Food item does not exist" });

    res.json(food);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/foods/getfoodtags/:name
// @desc    Get food tags from the foods collection from the food with the given name.
// @access  Public
router.get("/getfoodtags/:name", async (req, res) => {
  try {
    const food = await Food.findOne({ name: req.params.name });
    if (!food) return res.status(400).json({ msg: "Food item does not exist" });
    //console.log(food);
    return res.json(food.foodTags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/foods/getuserfoodtags/:name
// @desc    Get food tags from the foods collection from the food with the given name.
// @access  Public
router.get("/getuserfoodtags/:name", (req, res) => {
  try {
    var retarr = [];
    Food.findOne({ name: req.params.name }).exec((err1, food) => {
      if (!food)
        return res.status(400).json({ msg: "Food item does not exist" });
      food.userTags.forEach((userTag) => {
        User_Tag.findOne({ _id: userTag }).exec((err1, temp) => {
          retarr.push(temp);
          if (retarr.length === food.userTags.length) {
            for (let i = 1; i < retarr.length; i++) {
              // sort by rating high to low
              let current = retarr[i];
              let j = i - 1;
              while (j > -1 && current.rating > retarr[j].rating) {
                retarr[j + 1] = retarr[j];
                j--;
              }
              retarr[j + 1] = current;
            }
            return res.json(retarr);
          }
        });
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/foods/searchusertag/:name
// @desc    Get food tags from the food tag collection matching the given name.
// @access  Public
router.get("/searchusertag/:name", async (req, res) => {
  try {
    const food_tag = await Food_Tag.find({ name: req.params.name });

    if (!food_tag)
      return res.status(400).json({ msg: "Food item does not exist" });

    res.json(food_tag);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/foods/searchtags/:name
// @desc    Get user-created food tags from the food tag collection matching the given name.
// @access  Public
router.get("/searchtags/:name", async (req, res) => {
  try {
    const food_tag = await Food_Tag.find({
      name: req.params.name,
      tagType: "user-created",
    });

    if (!food_tag)
      return res.status(400).json({ msg: "Food item does not exist" });

    res.json(food_tag);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/outsidesource/:username", async (req, res) => {
  try {
    const foods = await User_Created_Food.find({
      username: req.params.username
    });
    if (!foods)
      return res.status(400).json({ msg: "No foods found" });

    res.json(foods);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/outsidesource", async (req, res) => {
  const food_id = new mongoose.Types.ObjectId();
  const match = await User_Created_Food.findOne({ username: req.body.data.username, name: req.body.data.name });
  if (match) {
    return res.status(400).json({ msg: "You arleady have a food item with that name." });
  }
  try {
    const food = new User_Created_Food({
      _id: food_id,
      username: req.body.data.username,
      name: req.body.data.name,
      servingSize: req.body.data.servingSize,
      calories: req.body.data.calories,
      totalFat: req.body.data.totalFat,
      saturatedFat: req.body.data.saturatedFat,
      cholesterol: req.body.data.cholesterol,
      sodium: req.body.data.sodium,
      totalCarbohydrate: req.body.data.totalCarbohydrate,
      sugar: req.body.data.sugar,
      addedSugar: req.body.data.addedSugar,
      dietaryFiber: req.body.data.dietaryFiber,
      protein: req.body.data.protein,
      calcium: req.body.data.calcium,
      iron: req.body.data.iron,
    });
    food.save((err, user) => {
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
});

router.delete("/outsidesource", async (req, res) => {
  console.log(req.body);
  try {
    const food = await User_Created_Food.deleteOne({
      name: req.body.name, username: req.body.username
    });
    if (!food)
      return res.status(400).json({ msg: "Delete successful" });
    res.send({ message: "Deleted successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
