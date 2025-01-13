const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

let Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
