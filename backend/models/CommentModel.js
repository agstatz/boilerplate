const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  username: String,
  parentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  diningCourtName: String,
  body: String,
  username: String,
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("comment", CommentSchema);
