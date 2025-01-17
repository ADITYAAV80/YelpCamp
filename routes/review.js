const express = require("express");
const routes = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");

const reviewController = require("../controller/review");

const {
  isAuthenticated,
  isReviewAuthor,
  validateReview,
} = require("../middleware");

routes.post(
  "/",
  isAuthenticated,
  validateReview,
  catchAsync(reviewController.create)
);

routes.delete(
  "/:reviewId",
  isAuthenticated,
  isReviewAuthor,
  catchAsync(reviewController.delete)
);

module.exports = routes;
