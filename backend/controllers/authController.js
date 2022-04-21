const dbm = require("../models");
const User = require("../models/userModel");
const Food_Tag = require("../models/foodTagsModel");
const Food_Tag_Type = require("../models/foodTagTypeModel");
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
    locationsVisited: [],
    favoriteFoods: []
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.data.privilegeClasses) {
      PrivilegeClass.find(
        {
          name: { $in: req.body.data.privilegeClasses },
        },
        (err, pcs) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.privilegeClasses = pcs.map(
            (privilege_classes) => privilege_classes._id
          );
          user.save((err) => {
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
        user.save((err) => {
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
  User.findOne({
    username: req.body.data.username,
  }).exec((err, user) => {
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
        message: "Invalid Password!",
      });
    }
    var token = jwt.sign({ id: user.id }, config.key, {
      expiresIn: 86400, // 24 hours
    });
    var isAdmin = false;
    var isModerator = false;
    var isDiningStaff = false;
    PrivilegeClass.find(
      {
        _id: { $in: user.privilegeClasses },
      },
      (err, privilege_classes) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < privilege_classes.length; i++) {
          if (privilege_classes[i].name === "admin") {
            isAdmin = true;
          }
          if (privilege_classes[i].name === "moderator") {
            isModerator = true;
          }
          if (privilege_classes[i].name === "dining staff") {
            isDiningStaff = true;
          }
        }
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken: token,
          admin: isAdmin,
          moderator: isModerator,
          diningStaff: isDiningStaff,
        });
      }
    );
  });
};

// edit user information
exports.editUser = (req, res) => {
  User.updateOne(
    { username: req.body.data.oldUsername },
    {
      username: req.body.data.username,
      firstName: req.body.data.firstName,
      lastName: req.body.data.lastName,
      email: req.body.data.email,
      lightMode: req.body.data.light,
      password: bcrypt.hashSync(req.body.data.password, 8),
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
      message: "User information updated successfully",
    });
  });
};

exports.addFavorite = (req, res) => {
console.log(req.body)
  User.updateOne(
    { username: req.body.data.user },
    {
      $push: { "favoriteFoods": String(req.body.data.food) },
    },
  ).exec((err, user) => {
    if (err) {
      console.log(err)
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found" });
    }
    res.status(200).send({
      message: "Favorite food added successfully",
    });
    console.log(User.findOne({ username: req.body.user }))
  });
}

exports.get_user_info = (req, res) => {
  User.findOne({
    username: req.body.data.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found" });
    }
    res.status(200).send({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      lightMode: user.lightMode,
      carbOpt: user.carbOpt,
      starNotifs: user.starNotifs,
      newMenuNotifs: user.newMenuNotifs,
      mealSwipes: user.mealSwipes,
      friends: user.friends,
      diets: user.diets,
      allergies: user.allergies,
      locationStars: user.locationStars,
      foodStars: user.foodStars,
      foodBlacklist: user.foodBlacklist,
      intakePlans: user.intakePlans,
      mealPlans: user.mealPlans,
      locationsVisited: user.locationsVisited,
    });
  });
};

exports.resetUser = (req, res) => {
  User.updateOne(
    { username: req.body.data.username },
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
      locationsVisited: [],
      favoriteFoods: []
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
      message: "User preferences updated successfully",
    });
  });
};

exports.editUserDietaryPreferences = async (req, res) => {
  let diets = [];
  let allergies = [];

  for (const [key, value] of Object.entries(req.body.data)) {
    if (key.toString() == "dietary" && value != 0) {
      switch (value) {
        case 1:
          diets.push((await Food_Tag.findOne({ name: "vegetarian" }))._id);
          break;
        case 2:
          diets.push((await Food_Tag.findOne({ name: "vegan" }))._id);
          break;
        case 3:
          diets.push((await Food_Tag.findOne({ name: "pescatarian" }))._id);
      }
    }

    if (key == "dairy" && value == 1) {
      allergies.push((await Food_Tag.findOne({ name: "dairy" }))._id);
    }

    if (key == "gluten" && value == 1) {
      allergies.push((await Food_Tag.findOne({ name: "gluten" }))._id);
    }

    if (key == "nuts" && value == 1) {
      allergies.push((await Food_Tag.findOne({ name: "nuts" }))._id);
    }

    if (key == "religious" && value != 0) {
      switch (value) {
        case 1:
          diets.push((await Food_Tag.findOne({ name: "halal" }))._id);
          break;
        case 2:
          diets.push((await Food_Tag.findOne({ name: "kosher" }))._id);
          break;
      }
    }
  }

  exports.editFoodRating = async (req, res) => {};

  User.updateOne(
    { username: req.body.data.username },
    {
      mealSwipes: req.body.data.mealSwipes,
      diets: diets,
      allergies: allergies,
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
      message: "User dietary preferences updated successfully",
    });
  });
};

// edit user preferences from preference quiz
exports.editUserPreferences = (req, res) => {
  User.findOne({ username: req.body.data.username })
    .populate("allergies")
    .populate("diets")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found" });
      }

      // populating user allergies array
      if (req.body.data.allergies && req.body.data.allergies.length > 0) {
        var numAllergens = req.body.data.allergies.length;
        var allergensProcessed = 0;
        req.body.data.allergies.forEach((allergen, i) =>
          Food_Tag.findOne({ name: allergen }).exec((err, food) => {
            if (err) {
              return res.status(500).send({ message: err });
            }
            if (!food) {
              // if the food type is not found, create a new one
              Food_Tag_Type.findOne({ name: "allergen" }).exec((err, tag) => {
                if (err) {
                  return res.status(500).send({ message: err });
                }
                if (!tag) {
                  return res
                    .status(404)
                    .send({ message: "Allergen tag not found" });
                }

                const food = new Food_Tag({
                  name: allergen,
                  tagType: tag,
                  foods: [],
                });

                food.save((err, food) => {
                  if (err) {
                    return res.status(500).send({ message: err });
                  }
                  if (!food) {
                    return res
                      .status(404)
                      .send({ message: "Error while saving food type" });
                  }
                  user.allergies.push(food._id);
                });
              });
            } else {
              user.allergies.push(food._id);
            }

            allergensProcessed++;

            if (allergensProcessed == numAllergens) {
              if (req.body.data.diets && req.body.data.diets.length > 0) {
                // populating user diets array
                var numDiets = req.body.data.diets.length;
                var dietsProcessed = 0;

                req.body.data.diets.forEach((diet, i) => {
                  Food_Tag.findOne({ name: diet }).exec((err, food) => {
                    if (err) {
                      return res.status(500).send({ message: err });
                    }
                    if (!food) {
                      // if the food type is not found, create a new one
                      Food_Tag_Type.findOne({ name: "diet" }).exec(
                        (err, tag) => {
                          if (err) {
                            return res.status(500).send({ message: err });
                          }
                          if (!tag) {
                            return res
                              .status(404)
                              .send({ message: "Diet tag not found" });
                          }

                          const food = new Food_Tag({
                            name: diet,
                            tagType: tag,
                            foods: [],
                          });

                          food.save((err, food) => {
                            if (err) {
                              return res.status(500).send({ message: err });
                            }
                            if (!food) {
                              return res.status(404).send({
                                message: "Error while saving food type",
                              });
                            }
                            user.diets.push(food._id);
                          });
                        }
                      );
                    } else {
                      user.diets.push(food._id);
                    }

                    dietsProcessed++;

                    if (dietsProcessed == numDiets) {
                      user.mealSwipes = req.body.data.mealSwipes;
                      user.save((err) => {
                        if (err) {
                          return res.status(500).send({ message: err });
                        }
                        res.status(200).send({
                          message: "User preferences updated successfully",
                        });
                      });
                    }
                  });
                });
              } else {
                user.mealSwipes = req.body.data.mealSwipes;
                user.save((err) => {
                  if (err) {
                    return res.status(500).send({ message: err });
                  }
                  res.status(200).send({
                    message: "User preferences updated successfully",
                  });
                });
              }
            }
          })
        );
      } else if (req.body.data.diets && req.body.data.diets.length > 0) {
        // populating user diets array
        var numDiets = req.body.data.diets.length;
        var dietsProcessed = 0;

        req.body.data.diets.forEach((diet, i) => {
          Food_Tag.findOne({ name: diet }).exec((err, food) => {
            if (err) {
              return res.status(500).send({ message: err });
            }
            if (!food) {
              // if the food type is not found, create a new one
              Food_Tag_Type.findOne({ name: "diet" }).exec((err, tag) => {
                if (err) {
                  return res.status(500).send({ message: err });
                }
                if (!tag) {
                  return res
                    .status(404)
                    .send({ message: "Diet tag not found" });
                }

                const food = new Food_Tag({
                  name: diet,
                  tagType: tag,
                  foods: [],
                });

                food.save((err, food) => {
                  if (err) {
                    return res.status(500).send({ message: err });
                  }
                  if (!food) {
                    return res
                      .status(404)
                      .send({ message: "Error while saving food type" });
                  }
                  user.diets.push(food._id);
                });
              });
            } else {
              user.diets.push(food._id);
            }

            dietsProcessed++;

            if (dietsProcessed == numDiets) {
              user.mealSwipes = req.body.data.mealSwipes;
              user.save((err) => {
                if (err) {
                  return res.status(500).send({ message: err });
                }
                res.status(200).send({
                  message: "User preferences updated successfully",
                });
              });
            }
          });
        });
      } else {
        user.mealSwipes = req.body.data.mealSwipes;
        user.save((err) => {
          if (err) {
            return res.status(500).send({ message: err });
          }
          res.status(200).send({
            message: "User preferences updated successfully",
          });
        });
      }
    });
};
