const express = require("express");
const router = express.Router();
const MotD = require("../models/motd");
const mongoose = require("mongoose");

// @route   GET api/motd/main
// @desc    Get main motd from collection
// @access  Public
router.get("/main", async (req, res) => {
  try {
    const motd = await MotD.findOne( { name: "main" } );
    res.json(motd);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/motd/main
// @desc    update main motd
// @access  Public
router.post("/main", async (req, res) => {
  const motd_id = new mongoose.Types.ObjectId();
  try {
    const motd = new MotD({
      _id: motd_id,
      name: "main",
      isHidden: false,
      contents: "This is the message of the day! Hello!"
    });
    motd.save((err, user) => {
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

// @route   PUT api/motd/main
// @desc    update main motd
// @access  Public
router.put("/main", async (req, res) => {
  try {
    const motd = await MotD.findOne( { name: "main" } );
    if (!motd)
      return res.status(400).json({ msg: "MotD not found." });

    const filter = { name: "main" };

    const updateDoc = {
      $set: {
        isHidden: req.body.data.isHidden,
        contents: req.body.data.contents
      },
    };

    const result = await MotD.updateOne(filter, updateDoc);

    motd.save((err, motdr) => {
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
