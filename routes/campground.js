const express = require("express");
const routes = express.Router();

const catchAsync = require("../utils/catchAsync");
const expressError = require("../utils/expressError");

const Campground = require("../model/campground");

const campgroundSchema = require("../schemas/campgroundSchema");
const validateCampground = (req, res, next) => {
  let { error } = campgroundSchema.validate(req.body);
  console.log(req.body);
  if (error) {
    message = error.details.map((e) => e.message).join(",");
    throw new expressError(message, 400);
  } else {
    next();
  }
};

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
  catchAsync(async (req, res) => {
    res.render("campgrounds/new.ejs", { title: "New Campground" });
  })
);

routes.post(
  "/",
  validateCampground,
  catchAsync(async (req, res, next) => {
    let campground = new Campground(req.body);
    console.log(campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

routes.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    let { id } = req.params;
    let campground = await Campground.findById(id);
    res.render("campgrounds/edit.ejs", {
      title: "Edit Campground",
      campground,
    });
  })
);

routes.put(
  "/:id",
  validateCampground,
  catchAsync(async (req, res) => {
    let { id } = req.params;
    let newcampground = await Campground.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    res.redirect(`/campgrounds/${id}`);
  })
);

routes.delete(
  "/:id",
  catchAsync(async (req, res) => {
    let { id } = req.params;
    let status = await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

routes.get(
  "/:id",
  catchAsync(async (req, res) => {
    let { id } = req.params;
    let campground = await Campground.findById(id).populate("reviews");
    res.render("campgrounds/show.ejs", { title: campground.title, campground });
  })
);

module.exports = routes;
