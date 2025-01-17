const Review = require("../model/review");
const Campground = require("../model/campground");

module.exports.create = async (req, res) => {
  let { id } = req.params;
  let campground = await Campground.findById(id);

  let review = new Review(req.body.review);
  review.author = req.user._id;
  let r = await review.save();

  campground.reviews.push(review);
  let c = await campground.save();

  req.flash("success", "Successfully made a new review!");
  res.redirect(`/campgrounds/${id}`);
};

module.exports.delete = async (req, res) => {
  let { id, reviewId } = req.params;
  await Review.findByIdAndDelete(reviewId);
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  req.flash("success", "Successfully deleted review!");
  res.redirect(`/campgrounds/${id}`);
};
