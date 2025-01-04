const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campgroundSchema = Schema({
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
});

let Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
