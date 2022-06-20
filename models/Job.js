const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

let job_Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/hoquanglinh/image/upload/v1654225496/004_pxxwi9.jpg",
  },
  desc: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  expireDate: {
    type: Date,
    default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
  },
  positionNumber: {
    type: Number,
    default: 1,
  },
  salary: {
    type: Number,
    default: 10000000,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
});

job_Schema.plugin(uniqueValidator);

exports.Job = mongoose.model("Job", job_Schema);
