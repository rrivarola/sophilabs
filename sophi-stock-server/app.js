var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var FileStore = require("session-file-store")(session);
var passport = require("passport");
var authenticate = require("./authenticate");
var config = require("./config");
var cors = require("./routes/cors");

//To start mongo db server
//Move to the mongodb folder and then start the MongoDB server by typing the following at the prompt: C:\mongodb
//mongod --dbpath=data --bind_ip 127.0.0.1

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
const mongoose = require("mongoose");
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then(
  (db) => {
    console.log("Connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

const hostname = "localhost";
const port = 3001;

var app = express();

// // Secure traffic only
// app.all("*", (req, res, next) => {
//   if (req.secure) {
//     return next();
//   } else {
//     res.redirect(
//       307,
//       "https://" + req.hostname + ":" + app.get("secPort") + req.url
//     );
//   }
// });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR");
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
 });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//Dependencies
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));

app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
