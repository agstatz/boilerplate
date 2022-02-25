const dbm = require("../models");
const FoodTag = require("../models/foodTagsModel");

exports.addUserTag = (req, res) => {
  const foodTag = new FoodTag({
      name: req.body.data.name,
      tagType: "user-created",
      foods: []
    });
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });
};

exports.searchTags = (req, res) => {
  console.log(req.body)
  FoodTag.find({
    name: req.body.data.name
  })
    .exec((err, tag) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "Tag Not found." });
      }
      console.log(tag)
      res.json(tag.data)
    });
};

exports.searchUserTag = (req, res) => {
  console.log(req.body)
  User.findOne({
    tagType: req.body.data.tagType,
    name: req.body.data.name
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      console.log(tag)
      res.json(tag.data)
    });
};