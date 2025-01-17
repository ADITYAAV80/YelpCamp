const User = require("../model/user");
const passport = require("passport");

module.exports.registerForm = (req, res) => {
  res.render("users/register", { title: "register" });
};

module.exports.register = async (req, res, err) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Yelp Camp!!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/users/register");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("users/login", { title: "login" });
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!!");
  res.redirect("/campgrounds");
};

module.exports.logout = (req, res) =>
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
