let express = require("express");

const Campground = require("./model/campground");
const expressError = require("./utils/expressError");

const campgroundSchema = require("./schemas/campgroundSchema");
const validateCampground = (req, res, next) => {
  let { error } = campgroundSchema.validate(req.body);
  if (error) {
    message = error.details.map((e) => e.message).join(",");
    throw new expressError(message, 400);
  } else {
    next();
  }
};

let isAuthenticated = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in first");
    res.redirect("/users/login");
  }
  next();
};

let isAuthor = async (req, res, next) => {
  let { id } = req.params;
  let c = await Campground.findById(id);
  console.log(req.user._id, c.author);
  if (!c.author.equals(req.user._id)) {
    req.flash("error", "You don't have permission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports = { isAuthenticated, isAuthor, validateCampground };
