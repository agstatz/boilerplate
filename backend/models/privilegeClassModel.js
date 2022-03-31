const mongoose = require("mongoose");
const PrivilegeClass = mongoose.model(
  "privilege_classes",
  new mongoose.Schema({
    name: String,
  })
);
module.exports = PrivilegeClass;
