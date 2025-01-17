const express = require("express");
const routes = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const expressError = require("../utils/expressError");
const passport = require("passport");

const userController = require("../controller/user");

routes
  .route("/register")
  .get(userController.registerForm)
  .post(catchAsync(userController.register));

routes
  .route("/login")
  .get(userController.loginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: "Invalid Username or password",
      failureRedirect: "/users/login",
    }),
    userController.login
  );

routes.get("/logout", userController.logout);

module.exports = routes;
