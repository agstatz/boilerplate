const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Food_Tag = require("../models/foodTagsModel");
const { default: mongoose } = require("mongoose");
const BanReport = require("../models/BanReportModel");

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

router.get('/isbanned/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    const match = await BanReport.findOne({ username: user._id });
    if (match) {
      res.json( { isBanned: true, reason: match.reason } );
    } else {
      res.json( { isBanned: false } );
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

router.post('/ban/', async (req, res) => {
  const ban_id = new mongoose.Types.ObjectId();
  try {
    const user = await User.findOne({ username: req.body.data.username });
    var found = false;
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }
    for (var i = 0; i < user.privilegeClasses.length; i++) {
      if (user.privilegeClasses[i].equals(mongoose.Types.ObjectId('6217f2ca0259b381d1c55fe2'))) {
        found = true;
      }
    }
    if (found) {
      return res.status(400).json({ msg: "Target user is an admin, you cannot ban an admin." });
    }
    const match = await BanReport.findOne({ username: user._id });
    if (match) {
      return res.status(400).json({ msg: "Target user has already recieved a ban." });
    }
    found = false;
    const admin = await User.findOne({ username: req.body.data.admin });
    if (!admin) {
      return res.status(400).json({ msg: "Error with your account privileges" });
    }
    for (var i = 0; i < admin.privilegeClasses.length; i++) {
      if (admin.privilegeClasses[i].equals(mongoose.Types.ObjectId('6217f2ca0259b381d1c55fe2'))) {
        found = true;
      }
    }
    if (!found) {
      return res.status(400).json({ msg: "Error with your account privileges." });
    }
    const ban = new BanReport({
      _id: ban_id,
      username: user._id,
      reason: req.body.data.reason,
      banAdminister: admin._id
    });
    ban.save((err, user) => {
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
})

router.get('/isadmin/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    var found = false;
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    for (var i = 0; i < user.privilegeClasses.length; i++) {
      if (user.privilegeClasses[i].equals(mongoose.Types.ObjectId('6217f2ca0259b381d1c55fe2'))) {
        res.json( { isAdmin: true } );
        found = true;
      }
    }
  } catch (err) {
    res.json( { isAdmin: false } );
    console.error(err.message);
    res.status(500).send("Server error");
  }
  if (!found) {
    res.json( { isAdmin: false } );
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
