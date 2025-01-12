const Joi = require("joi");

const campgroundSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().min(0).required(),
  location: Joi.string().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
}).required();

module.exports = campgroundSchema;
