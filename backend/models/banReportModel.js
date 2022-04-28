const mongoose = require("mongoose");

const BanReport = mongoose.model(
  "ban_reports",
  new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    reason: String,
    banAdminister: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      }
  })
);

module.exports = BanReport;