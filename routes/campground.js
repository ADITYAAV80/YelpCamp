const express = require("express");
const routes = express.Router();

const catchAsync = require("../utils/catchAsync");
const expressError = require("../utils/expressError");

const Campground = require("../model/campground");

const campgroundSchema = require("../schemas/campgroundSchema");
const validateCampground = (req, res, next) => {
  let { error } = campgroundSchema.validate(req.body);
  if (error) {
    message = error.details.map((e) => e.message).join(",");
    throw new expressError(message, 400);
  } else {
    next();
  }
};

let isAuthor = async (req, res, next) => {
  let { id } = req.params;
  let c = await Campground.findById(id);
  if (c.author._id !== req.user._id) {
    req.flash("error", "You don't have permission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
};

const { isAuthenticated } = require("../middleware");

routes.get(
  "/",
  catchAsync(async (req, res) => {
    let allCampgrounds = await Campground.find({});
    res.render("campgrounds/index.ejs", {
      title: "All Campgrounds",
      allCampgrounds,
    });
  })
);

routes.get(
  "/new",
  isAuthenticated,
  catchAsync(async (req, res) => {
    res.render("campgrounds/new.ejs", { title: "New Campground" });
  })
);

routes.post(
  "/",
  isAuthenticated,
  validateCampground,
  catchAsync(async (req, res, next) => {
    let campground = new Campground(req.body);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

routes.get(
  "/:id/edit",
  isAuthenticated,
  isAuthor,
  catchAsync(async (req, res) => {
    let { id } = req.params;
    let campground = await Campground.findById(id);
    if (!campground) {
      req.flash("error", "Campground not found!");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit.ejs", {
      title: "Edit Campground",
      campground,
    });
  })
);

routes.put(
  "/:id",
  isAuthenticated,
  isAuthor,
  validateCampground,
  catchAsync(async (req, res) => {
    let { id } = req.params;
    let newcampground = await Campground.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    req.flash("success", "Successfully edited campground!");
    res.redirect(`/campgrounds/${id}`);
  })
);

routes.delete(
  "/:id",
  isAuthor,
  isAuthenticated,
  catchAsync(async (req, res) => {
    let { id } = req.params;
    let status = await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted campground!");
    res.redirect("/campgrounds");
  })
);

routes.get(
  "/:id",
  catchAsync(async (req, res) => {
    let { id } = req.params;
    let campground = await Campground.findById(id);
    if (!campground) {
      req.flash("error", "Campground not found!");
      return res.redirect("/campgrounds");
    }
    await campground.populate("reviews");
    await campground.populate("author");
    res.render("campgrounds/show.ejs", { title: campground.title, campground });
  })
);

module.exports = routes;
