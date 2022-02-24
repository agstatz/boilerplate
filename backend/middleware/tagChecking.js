const dbm = require("../models");
const PRIVILEGE_CLASSES = dbm.PRIVILEGE_CLASSES;
const FoodTag = dbm.food_categories;

checkTagExists = (req, res, next) => {
  try {
    FoodTag.findOne({
      name: req.body.data.name
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Tag already exists" });
        return;
      }
      next();
    });
  }
  catch (error) {
    // ignore, users table is empty
    next();
  }
};

checkTagExists = (req, res, next) => {
  try {
    FoodTag.findOne({
      name: req.body.data.name
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Tag already exists!" });
        return;
      }
      next();
    });
  }
  catch (error) {
    // ignore, users table is empty
    next();
  }
};