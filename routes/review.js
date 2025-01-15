const express = require("express");
const routes = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const expressError = require("../utils/expressError");

const Review = require("../model/review");
const Campground = require("../model/campground");

const reviewSchema = require("../schemas/reviewSchema");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  console.log(req.body);
  if (error) {
    message = error.details.map((e) => e.message).join(",");
    throw new expressError(message, 400);
  } else {
    next();
  }
};

routes.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    let { id } = req.params;
    let campground = await Campground.findById(id);

    let review = new Review(req.body.review);

    let r = await review.save();

    campground.reviews.push(review);
    let c = await campground.save();

    res.redirect(`/campgrounds/${id}`);
  })
);

routes.delete("/:reviewId", async (req, res) => {
  let { id, reviewId } = req.params;
  await Review.findByIdAndDelete(reviewId);
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  res.redirect(`/campgrounds/${id}`);
});

module.exports = routes;
