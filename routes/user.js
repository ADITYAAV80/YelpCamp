const express = require("express");
const routes = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const expressError = require("../utils/expressError");

const User = require("../model/user");

routes.get("/register", (req, res) => {
  res.render("users/register", { title: "register" });
});

routes.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      console.log(registeredUser);
      req.flash("success", "Welcome to Yelp Camp!!");
      res.redirect("/campgrounds");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/users/register");
    }
  })
);

module.exports = routes;
