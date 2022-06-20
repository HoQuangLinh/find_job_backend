const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");
const { Category } = require("../models/Category");

//Get all categories
router.get("/", async function (req, res) {
  let categories = await Category.find();
  res.send(categories);
});

//Create a category
router.post("/create", async function (req, res) {
  if (!req.body.name) {
    return res.status(400).send("Not found category");
  }
  let categoryObj = Category({
    name: req.body.name,
  });
  let category = await categoryObj.save();
  res.send(category);
});

// //Get Category by Event
// router.get("/eventsByCategory", async function (req, res) {
//   let eventsByCategory = await Category.aggregate([
//     {
//       $lookup: {
//         from: "events",
//         localField: "_id",
//         foreignField: "category",
//         as: "events",
//       },
//     },
//   ]);
//   res.send(eventsByCategory);
// });

// //Update All Category
// router.get("/update", async function (req, res) {
//   let event = await Event.updateMany(
//     {},
//     { category: mongoose.Types.ObjectId("62997e12eac681f968ec2181") }
//   );
//   res.send(event);
// });
module.exports = router;
