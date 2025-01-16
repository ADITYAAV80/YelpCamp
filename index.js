const express = require("express");
const app = express();

const path = require("path");
const ejs = require("ejs");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log("Ohhhhhh Error");
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const methodOverride = require("method-override");
const { title } = require("process");
app.use(methodOverride("_method"));

const catchAsync = require("./utils/catchAsync");
const expressError = require("./utils/expressError");

app.use(express.static(path.join(__dirname, "public")));

const session = require("express-session");
const flash = require("connect-flash");

sessionConfig = {
  secret: "youareagoodsecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

const User = require("./model/user");
const passport = require("passport");
const localStrategy = require("passport-local");

//a- This middleware initializes Passport.js. It must be called first in the middleware stack before any routes where Passport is used.
//b- For session handling
//c- Use traditional password authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

//store and unstore user in a session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const campground = require("./routes/campground");
app.use("/campgrounds", campground);

const review = require("./routes/review");
app.use("/campgrounds/:id/reviews", review);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.all("*", (req, res, next) => {
  next(new expressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  let { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "Something Went Wrong";
  }
  res.status(statusCode).render("error", { title: "Error", err });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
