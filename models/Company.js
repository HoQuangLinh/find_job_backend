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
});

user_Schema.plugin(uniqueValidator);

exports.User = mongoose.model("User", company_Schema);
