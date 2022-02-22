const mongoose = require("mongoose");
const User = mongoose.model(
  "users",
  new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    privilegeClasses: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "privilegeClasses"
          }
        ]
  })
);
module.exports = User;