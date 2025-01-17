const express = require("express");
const routes = express.Router();

const catchAsync = require("../utils/catchAsync");

const { isAuthor } = require("../middleware");
const { validateCampground } = require("../middleware");
const { isAuthenticated } = require("../middleware");

const campgroundController = require("../controller/campground");

routes
  .route("/")
  .get(catchAsync(campgroundController.index))
  .post(
    isAuthenticated,
    validateCampground,
    catchAsync(campgroundController.create)
  );

routes.get(
  "/new",
  isAuthenticated,
  catchAsync(campgroundController.createForm)
);

routes
  .route("/:id")
  .get(catchAsync(campgroundController.show))
  .put(
    isAuthenticated,
    isAuthor,
    validateCampground,
    catchAsync(campgroundController.edit)
  )
  .delete(isAuthor, isAuthenticated, catchAsync(campgroundController.delete));

routes.get(
  "/:id/edit",
  isAuthenticated,
  isAuthor,
  catchAsync(campgroundController.editForm)
);

module.exports = routes;
