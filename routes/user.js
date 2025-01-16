const express = require("express");
const routes = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const expressError = require("../utils/expressError");

const User = require("../model/user");

routes.get("/register", (req, res) => {
  res.render("users/register", { title: "register" });
});

routes.post("/register", (req, res) => {
  res.send(req.body);
});

module.exports = routes;
