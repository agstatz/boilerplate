const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Food_Tag = require("../models/foodTagsModel");

// @route   GET api/users/:username
// @desc    Get single user item from collection.
// @access  Public
router.get("/dietary/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const restriction_ids = user.diets.concat(user.allergies);
    if (restriction_ids.length != 0) {
      const restrictions = await Food_Tag.find({
        _id: { $in: user.diets.concat(user.allergies) },
      });
      if (!restrictions)
        res.status(400).json({ msg: "Restrictions does not exist" });

      res.json({ restrictions: restrictions, mealSwipes: user.mealSwipes });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get('/favorites/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    if (user.favoriteFoods) {
      let send = [];
      for (food of user.favoriteFoods) {
        send.push({name: food});
      }
      res.json(send);
    } else {
      res.json([]);
    }  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

router.delete('/favorites/remove/:username/:food', async (req, res) => {
  try {
    // let food_ = req.params.food.replace("_", " ");  // replace underscores with spaces
    const user = await User.updateOne({ username: req.params.username }, { $pull: { favoriteFoods: req.params.food } });
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})



module.exports = router;
