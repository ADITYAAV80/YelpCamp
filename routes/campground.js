const express = require("express");
const routes = express.Router();

const catchAsync = require("../utils/catchAsync");

const { isAuthor } = require("../middleware");
const { validateCampground } = require("../middleware");
const { isAuthenticated } = require("../middleware");

const campgroundController = require("../controller/campground");

routes.get("/", catchAsync(campgroundController.index));

routes.get(
  "/new",
  isAuthenticated,
  catchAsync(campgroundController.createForm)
);

routes.post(
  "/",
  isAuthenticated,
  validateCampground,
  catchAsync(campgroundController.create)
);

routes.get(
  "/:id/edit",
  isAuthenticated,
  isAuthor,
  catchAsync(campgroundController.editForm)
);

routes.put(
  "/:id",
  isAuthenticated,
  isAuthor,
  validateCampground,
  catchAsync(campgroundController.edit)
);

routes.delete(
  "/:id",
  isAuthor,
  isAuthenticated,
  catchAsync(campgroundController.delete)
);

routes.get("/:id", catchAsync(campgroundController.show));

module.exports = routes;
