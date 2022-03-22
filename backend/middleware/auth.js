const jwt = require("jsonwebtoken");
const dbm = require("../models");
const User = dbm.users;
const PrivilegeClass = dbm.privilege_classes;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Not authorized" });
    }
    req.userId = decoded.id;
    next();
  });
};

// verifies that the user is an admin
isAdmin = (req, res, next) => {
  User.findById(req.body.data.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    PrivilegeClass.find(
      {
        _id: { $in: user.privilegeClasses }
      },
      (err, privilege_classes) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < privilege_classes.length; i++) {
          if (privilege_classes[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Requires admin privileges" });
        return;
      }
    );
  });
};

// verifies that the user is dining staff
isDiningStaff = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    PrivilegeClass.find(
      {
        _id: { $in: user.privilegeClasses }
      },
      (err, privilege_classes) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < privilege_classes.length; i++) {
          if (privilege_classes[i].name === "dining staff") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Requires dining staff privileges" });
        return;
      }
    );
  });
};

// verifies that the user is a moderator
isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    PrivilegeClass.find(
      {
        _id: { $in: user.privilegeClasses }
      },
      (err, privilege_classes) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < privilege_classes.length; i++) {
          if (privilege_classes[i].name === "moderator") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Requires moderator privileges" });
        return;
      }
    );
  });
};

// checks  if the user is a guest
isGuest = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    PrivilegeClass.find(
      {
        _id: { $in: user.privilegeClasses }
      },
      (err, privilege_classes) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < privilege_classes.length; i++) {
          if (privilege_classes[i].name === "guest") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "User is not a guest" });
        return;
      }
    );
  });
};


const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};

module.exports = authJwt;