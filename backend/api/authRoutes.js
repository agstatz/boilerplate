const { verifySignup } = require("../middleware");
const { checkTagNotExists } = require("../middleware/tagChecking");
const controller = require("../controllers/authController");
const foodController = require("../controllers/foodController");
const bodyParser = require("body-parser");
const CommentReport = require("../models/commentReportModel");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // change address to frontend host if needed
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/registeruser",
    bodyParser.json(),
    [verifySignup.checkDuplicates, verifySignup.checkPrivilegeClassExists],
    controller.registerUser
  );
  app.post(
    "/api/addUserTag",
    bodyParser.json(),
    foodController.addUserCreatedTag
  );
  app.post("/api/reportComment", bodyParser.json(), (req, res) => {
    console.log(req.body.data)
    const commentReport = new CommentReport({
      commentID: req.body.data.commentID,
      reportedBy: req.body.data.reportedBy,
      text: req.body.data.text,
      writtenAt: req.body.data.writtenAt,
      author: req.body.data.author,
      
    });
    commentReport.save((err, commentReport) => {
      if (err) {
        console.log(err)
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Comment reported successfully!" });
    });
    console.log('comment reported')

  });

  app.post('/api/allowcomment', bodyParser.json(), (req, res) => {
    console.log(req.body.data)
    CommentReport.findOneAndDelete({ _id: req.body.data._id }, (err, commentReport) => {
      if (err) {
        console.log(err)
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Comment reported successfully!" });
    });
  })

  app.get("/api/getcommentreports", (req, res) => {
    CommentReport.find({}, (err, commentReports) => {
      if (err) {
        console.log(err)
        res.status(500).send({ message: err });
        return;
      }
      res.send(commentReports );
    });
  });

  app.post("/api/signinuser", bodyParser.json(), controller.signinUser);
  app.post("/api/editUser", bodyParser.json(), controller.editUser);
  app.post("/api/resetUser", bodyParser.json(), controller.resetUser);
  app.post("/api/user/add_favorite", bodyParser.json(), controller.addFavorite);
  app.post(
    "/api/editUserPreferences",
    bodyParser.json(),
    controller.editUserPreferences
  );
  app.post(
    "/api/editUserDietaryPreferences",
    bodyParser.json(),
    controller.editUserDietaryPreferences
  );

  app.post(
    "/api/editFoodRating",
    bodyParser.json(),
    foodController.editFoodRating
  );

  app.get(
    "/api/getFoodRating/",
    bodyParser.json(),
    foodController.getFoodRating
  );
};
