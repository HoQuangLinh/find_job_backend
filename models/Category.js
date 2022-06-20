const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

let category_Schema = new Schema({
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
});

category_Schema.plugin(uniqueValidator);

exports.Category = mongoose.model("Category", category_Schema);
