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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/makecampground", async (req, res) => {
  let camp = new Campground({
    title: "Vansiri Greenfields",
    price: "5000",
    location: "jayanagar",
    description: "good place!!",
  });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
