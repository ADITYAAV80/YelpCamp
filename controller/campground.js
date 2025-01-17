const Campground = require("../model/campground");

module.exports.index = async (req, res) => {
  let allCampgrounds = await Campground.find({});
  res.render("campgrounds/index.ejs", {
    title: "All Campgrounds",
    allCampgrounds,
  });
};

module.exports.createForm = async (req, res) => {
  res.render("campgrounds/new.ejs", { title: "New Campground" });
};

module.exports.create = async (req, res, next) => {
  let campground = new Campground(req.body);
  campground.author = req.user._id;
  await campground.save();
  req.flash("success", "Successfully made a new campground!");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  let campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Campground not found!");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit.ejs", {
    title: "Edit Campground",
    campground,
  });
};

module.exports.edit = async (req, res) => {
  let { id } = req.params;
  let newcampground = await Campground.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  req.flash("success", "Successfully edited campground!");
  res.redirect(`/campgrounds/${id}`);
};

module.exports.delete = async (req, res) => {
  let { id } = req.params;
  let status = await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted campground!");
  res.redirect("/campgrounds");
};

module.exports.show = async (req, res) => {
  let { id } = req.params;
  let campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Campground not found!");
    return res.redirect("/campgrounds");
  }
  await campground.populate({
    path: "reviews",
    populate: { path: "author" },
  });
  await campground.populate("author");
  res.render("campgrounds/show.ejs", { title: campground.title, campground });
};
