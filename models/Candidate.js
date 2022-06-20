const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

let candidate_Schema = new Schema({
  cmnd: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    default: "Male",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  birthDate: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/hoquanglinh/image/upload/v1635330645/profile_ieghzz.jpg",
  },
});

candidate_Schema.plugin(uniqueValidator);

exports.Candidate = mongoose.model("Candidate", candidate_Schema);
