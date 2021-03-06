const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

let company_Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  tax: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  package: {
    type: String,
    default: "Free",
  },
  employer: {
    type: String,
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/hoquanglinh/image/upload/v1635330645/profile_ieghzz.jpg",
  },
});

company_Schema.plugin(uniqueValidator);

exports.Company = mongoose.model("Company", company_Schema);
