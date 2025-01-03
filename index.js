const express = require("express");
const app = express();

const path = require("path");
const ejs = require("ejs");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log("Ohhhhhh Error");
    console.log(err);
  });

const Campground = require("./model/campground");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/campgrounds", async (req, res) => {
  let allCampgrounds = await Campground.find({});
  res.render("campgrounds/index.ejs", { allCampgrounds });
});

app.get("/campgrounds/new", async (req, res) => {
  res.render("campgrounds/new.ejs");
});

app.post("/campgrounds", async (req, res) => {
  let campground = new Campground(req.body);
  console.log(campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  let { id } = req.params;
  let campground = await Campground.findById(id);
  res.render("campgrounds/edit.ejs", { campground });
});

app.put("/campgrounds/:id", async (req, res) => {
  let { id } = req.params;
  let newcampground = await Campground.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/campgrounds/${id}`);
});

app.delete("/campgrounds/:id", async (req, res) => {
  let { id } = req.params;
  let status = await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/:id", async (req, res) => {
  let { id } = req.params;
  let campground = await Campground.findById(id);
  res.render("campgrounds/show.ejs", { campground });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
