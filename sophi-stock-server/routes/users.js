var express = require("express");
var router = express.Router();
var authenticate = require("../authenticate");

const bodyParser = require("body-parser");
var User = require("../models/user");
var passport = require("passport");
const cors = require("./cors");

router.use(bodyParser.json());

router.get("/", authenticate.verifyUser, (req, res, next) => {
  User.find({})
    .then(
      (users) => {
        res.statusCode = 200;
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");
        res.json(users);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.post("/signup", (req, res, next) => {
  User.register(
    new User({ username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true, status: "Registration Successful!" });
          });
        });
      }
    }
  );
});

router.post(
  "/login",
  cors.corsWithOptions,
  passport.authenticate("local"),
  (req, res) => {
    let dataUser;
    console.log(req.user._id);
    
    User.find({ '_id': req.user._id }).then((user)=> {
     //User.fin(req.user._id).then((user)=> user.toJSON() );
     var token = authenticate.getToken({ _id: req.user._id });
     console.log(dataUser);
     res.statusCode = 200;
     res.setHeader("Content-Type", "application/json");
     res.header("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
     res.json({
       success: true,
       token: token,
       status: "You are successfully logged in!",
       user:user
     });
    }
    )
  }
);

router.get("/logout", (req, res) => {
  console.log(req.session);
  // if (req.session) {
  //  // req.session.destroy();
  //  //req.logOut();
  //  
  // } else {
  //   var err = new Error("You are not logged in!");
  //   err.status = 403;
  //   next(err);
  // }
 res.clearCookie("session-id");
  //   res.redirect("/");
  req.logOut();
  req.session = null;
  res.clearCookie("session-id");

  res.redirect("/");
});
module.exports = router;
