const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log("Ohhhhhh Error");
    console.log(err);
  });

const Campground = require("../model/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedhelper");

let randomGetter = (arr) => arr[Math.floor(Math.random() * arr.length)];

let authors = [
  "6788b5e0a6389f76df15a20a",
  "6788be12fc02f3caa03bd35f",
  "678911cdc64850cce9a65644",
];

let setData = async () => {
  let status = await Campground.deleteMany({});
  for (let i = 0; i < 100; i++) {
    let city = randomGetter(cities);
    let descriptor = randomGetter(descriptors);
    let place = randomGetter(places);
    let author = randomGetter(authors);
    let campground = {
      title: `${descriptor} ${place}`,
      location: `${city.city}, ${city.state}`,
      price: 50 + Math.floor(Math.random() * 20),
      image: `https://picsum.photos/200/300?random=${Math.floor(
        Math.random() * 800
      )}`,
      author,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur minima corrupti incidunt suscipit voluptate accusantium, voluptas, ipsa mollitia laboriosam, nobis enim. Soluta sapiente fugiat ea amet necessitatibus rem accusamus ut?Reprehenderit omnis explicabo cupiditate aperiam eaque alias quos tempora hic sed architecto. Est eveniet dolore",
    };
    let camp = new Campground(campground);
    await camp.save();
  }
};

setData().then(() => {
  mongoose.connection.close();
});
