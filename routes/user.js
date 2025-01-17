const express = require("express");
const routes = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const expressError = require("../utils/expressError");
const passport = require("passport");

const userController = require("../controller/user");

routes.get("/register", userController.registerForm);

routes.post("/register", catchAsync(userController.register));

routes.get("/login", userController.loginForm);

routes.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: "Invalid Username or password",
    failureRedirect: "/users/login",
  }),
  userController.login
);

routes.get("/logout", userController.logout);

module.exports = routes;
