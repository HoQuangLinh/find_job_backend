const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

let group_Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  event: [
    {
      avatar: {
        type: String,
      },
      image: {
        type: String,
      },
      name: {
        type: String,
      },
      detail: {
        type: String,
      },
      address: {
        type: String,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      participants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  ],
});

group_Schema.plugin(uniqueValidator);

exports.Group = mongoose.model("Group", group_Schema);
