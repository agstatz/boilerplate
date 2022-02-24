const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbm = {};
dbm.mongoose = mongoose;
dbm.privilege_classes = require("./privilegeClassModel");
// const PrivilegeClass = require("./privilegeClassModel");
dbm.users = require("./userModel");
dbm.PRIVILEGE_CLASSES = ["user", "admin", "moderator", "dining staff"];

//connect Mongoose to MongoDB
dbm.mongoose
  .connect("mongodb+srv://admin:1234@cluster0.ggera.mongodb.net/boilerplate?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Mongoose successfully connect to MongoDB.")
    initializePrivilegeClasses();
  })
  .catch(err => console.error("Mongoose connection error", err));


function initializeUsers() {
  dbm.users.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new User({
        username: "template",
        firstName: "template",
        lastName: "template",
        email: "template@template.template",
        password: "template",
        privilegeClasses:
          [
            "user"
          ]
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