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
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

let Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
