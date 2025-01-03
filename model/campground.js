const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campgroundSchema = Schema({
  title: {
    type: String,
  },
  price: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
});

let Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
