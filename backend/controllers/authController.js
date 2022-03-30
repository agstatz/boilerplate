const dbm = require("../models");
const User = require("../models/userModel");
const Food_Tag = require("../models/foodTagsModel")
const Food_Tag_Type = require("../models/foodTagTypeModel")
const config = require("../config/authConfig.js");
const PrivilegeClass = dbm.privilege_classes;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// create a new user
exports.registerUser = (req, res) => {
  const user = new User({
    username: req.body.data.username,
    firstName: req.body.data.firstName,
    lastName: req.body.data.lastName,
    email: req.body.data.email,
    password: bcrypt.hashSync(req.body.data.password, 8),
    lightMode: 1,
    carbOpt: 0,
    starNotifs: 0,
    newMenuNotifs: 0,
    mealSwipes: -1,
    friends: [],
    diets: [],
    allergies: [],
    locationStars: [],
    foodStars: [],
    foodBlacklist: [],
    intakePlans: [],
    mealPlans: [],
    locationsVisited: []
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.data.privilegeClasses) {
      PrivilegeClass.find(
        {
          name: { $in: req.body.data.privilegeClasses }
        },
        (err, pcs) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.privilegeClasses = pcs.map(privilege_classes => privilege_classes._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      PrivilegeClass.findOne({ name: "user" }, (err, pc) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.privilegeClasses = [pc._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};


exports.signinUser = (req, res) => {
  console.log(req.body)
  User.findOne({
    username: req.body.data.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.data.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.key, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
      console.log(err);
    });
};


// edit user information
exports.editUser = (req, res) => {
  User.updateOne(
    {username: req.body.data.oldUsername},
    {
      username: req.body.data.username,
      firstName: req.body.data.firstName,
      lastName: req.body.data.lastName,
      email: req.body.data.email,
      lightMode: req.body.data.light,
      password: bcrypt.hashSync(req.body.data.password, 8)
    }
  )
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found" });
      }
      res.status(200).send({
        message: "User information updated successfully"
      });
    });
};

exports.resetUser = (req, res) => {
  console.log('RESET1')
  User.updateOne(
    {username: req.body.data.username},
    {
      lightMode: false,
      carbOpt: 0,
      starNotifs: 0,
      newMenuNotifs: 0,
      mealSwipes: 0,
      friends: [],
      diets: [],
      allergies: [],
      locationStars: [],
      foodStars: [],
      foodBlacklist: [],
      intakePlans: [],
      mealPlans: [],
      locationsVisited: []
    }
  ).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found" });
    }
    res.status(200).send({
      message: "User preferences updated successfully"
    });
  });

}
// edit user preferences from preference quiz
exports.editUserPreferences = (req, res) => {
  User.findOne({ username: req.body.data.username })
    .populate('allergies')
    .populate('diets')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found" });
      }

      // populating user allergies array
      if(req.body.data.allergies)
      {
        var numItems = req.body.data.allergies.length
        var itemsProcessed = 0
        req.body.data.allergies.forEach((allergen, i) => 
          Food_Tag.findOne(
            {name: allergen}
          )
          .exec((err, food) => {
            if (err) {
              return res.status(500).send({message: err});
            }
            if (!food) {
              // return res.status(404).send({ message: "Food type not found" });
              Food_Tag_Type.findOne({name: "allergen"})
                .exec((err, tag) => {
                  if (err) {
                    return res.status(500).send({ message: err });
                  }
                  if (!user) {
                    return res.status(404).send({ message: "Allergen tag not found" });
                  }

                  const food = new Food_Tag({
                    name: allergen,
                    tagType: tag,
                    foods: []
                  });

                  food.save((err, food) => {
                    if (err) {
                      return res.status(500).send({ message: err });
                    }
                    if (!food) {
                      return res.status(404).send({ message: "Error while saving food type" });
                    }
                    user.allergies.push(food._id)
                  })
                })
            }
            else {
              user.allergies.push(food._id)
            }

            itemsProcessed++;
            if (itemsProcessed == numItems) {
              user.mealSwipes = req.body.data.mealSwipes
              user.save(err => {
                if (err) {
                  return res.status(500).send({ message: err });
                }
              })
            }
          })
        )
      }
      else {
        user.mealSwipes = req.body.data.mealSwipes
        user.save(err => {
          if (err) {
            return res.status(500).send({ message: err });
          }
        })
      }

      res.status(200).send({
        message: "User preferences updated successfully"
      });
    });
};
