const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = require("./review");

const campgroundSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

campgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc.reviews.length) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

let Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
