const dbm = require("../models");
const PRIVILEGE_CLASSES = dbm.PRIVILEGE_CLASSES;
const User = dbm.users;

// checks for duplicate usernames and emails

checkDuplicates = (req, res, next) => {
  try {
    User.findOne({
      username: req.body.data.username
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
      }
      User.findOne({
        email: req.body.data.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (user) {
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return;
        }
        next();
      });
    });
  }
  catch (error) {
    // ignore, users table is empty
    next();
  }
};


// checks if the received privilege classes are valid
checkPrivilegeClassExists = (req, res, next) => {
  try {
    if (req.body.data.privilege_classes) {
      for (let i = 0; i < req.body.data.privilege_classes.length; i++) {
        if (!PRIVILEGE_CLASSES.includes(req.body.data.privilege_classes[i])) {
          res.status(400).send({
            message: `Failed! Privilege Classes ${req.body.data.privilege_classes[i]} does not exist!`
          });
          return;
        }
      }
    }
    next();
  }
  catch (error) {
    //ignore, the privilege_classes table is empty
    next();
  }
};

const verifySignup = {
  checkDuplicates,
  checkPrivilegeClassExists
};

module.exports = verifySignup;