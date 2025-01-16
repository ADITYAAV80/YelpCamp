let express = require("express");

let isAuthenticated = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in first");
    res.redirect("/users/login");
  }
  next();
};

module.exports = { isAuthenticated };
