const express = require("express");
const router = express.Router();
const Comment = require("../models/CommentModel");
const mongoose = require("mongoose");

// @route   GET /api/comments/:courtname
// @desc    Get comments for a specific dining court
// @access  Public
router.get("/:court", async (req, res) => {
  console.log("getting comments");
  const court = req.params.court;

  console.log(court);

  try {
    const comments = await Comment.find({ diningCourtName: court }).sort({
      createAt: -1,
    });
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/comments/
// @desc    Add a comment
// @access  Public (should be Private)
router.post("/:court", async (req, res) => {
  const { parentID, body, username } = req.body;
  const court = req.params.court;

  try {
    const newComment = new Comment({
      parentID,
      body,
      diningCourtName: court,
      username,
    });

    const comment = await newComment.save();
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/comments/:id
// @desc  Update a comment
// @access Public
router.put("/:id", async (req, res) => {
  const { body, likes } = req.body;

  // Build object
  const commentFields = {};
  if (body) commentFields.body = body;
  if (likes) commentFields.likes = likes;

  try {
    let comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });

    comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: commentFields },
      { new: true }
    );

    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/comments/:id
// @desc  Delete comment
// @access (Should be Private)
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ msg: "Comment not found" });

    await Comment.findByIdAndRemove(req.params.id);

    res.json({ msg: "Comment removed " });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
