const dbm = require("../models");
const PRIVILEGE_CLASSES = dbm.PRIVILEGE_CLASSES;
const FoodTag = dbm.food_categories;

checkTagNotExists = (req, res, next) => {
  try {
    FoodTag.findOne({
      name: req.body.data.name,
    }).exec((err, tag) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (tag) {
        res.status(400).send({ message: "Tag already exists" });
        return;
      }
      next();
    });
  } catch (error) {
    // ignore, users table is empty
    next();
  }
};

const tagChecking = {
  checkTagNotExists,
};

module.exports = tagChecking;
