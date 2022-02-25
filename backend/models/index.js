const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbm = {};
dbm.mongoose = mongoose;
dbm.privilege_classes = require("./privilegeClassModel");
const PrivilegeClass = require("./privilegeClassModel");
dbm.users = require("./userModel");
dbm.food_tag_types = require("./foodTagTypeModel")
const Food_Tag_Type = require("./foodTagTypeModel");
dbm.PRIVILEGE_CLASSES = ["user", "admin", "moderator", "dining staff"];
dbm.FOOD_TAG_TYPES = ["user-created", "allergen", "diet", "cuisine"];

//connect Mongoose to MongoDB
dbm.mongoose
  .connect("mongodb+srv://admin:1234@cluster0.ggera.mongodb.net/boilerplate?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Mongoose successfully connect to MongoDB.")
    initializeFoodTagTypes();
    initializePrivilegeClasses();
  })
  .catch(err => console.error("Mongoose connection error", err));

// initialize the food tag type table
function initializeFoodTagTypes() {
  dbm.food_tag_types.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Food_Tag_Type({
          name: "user-created"
        }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });
      new Food_Tag_Type({
          name: "allergen"
        }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });
      new Food_Tag_Type({
          name: "diet"
        }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });
      new Food_Tag_Type({
          name: "cuisine"
        }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });
    }
  });
}

// initialize the privilege classes table to define privileges for users
function initializePrivilegeClasses() {
  dbm.privilege_classes.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new PrivilegeClass({
          name: "user"
        }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });
      new PrivilegeClass({
          name: "moderator"
        }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });
      new PrivilegeClass({
          name: "dining staff"
        }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });
      new PrivilegeClass({
          name: "admin"
        }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });
    }
  });
}

module.exports = dbm