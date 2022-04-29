const express = require("express");
const router = express.Router();
const Comment = require("../models/CommentModel");
const mongoose = require("mongoose");

// @route   GET /api/comments/:courtname
// @desc    Get comments for a specific dining court
// @access  Public
router.get("/", async (req, res) => {
  console.log("getting comments");
  const dining_id = req.params.courtname;

  console.log(dining_id);

  try {
    const comments = await Comment.find({ diningCourtName: courtname }).sort({
      createAt: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/comments/
// @desc    Add a comment
// @access  Public (should be Private)
router.post("/", async (req, res) => {
  const { parentID, body, username } = req.body;

  try {
    const newComment = new Comment({
      parentID,
      body,
      userID: req.user.id,
      username,
    });

    const comment = await newComment.save();
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
