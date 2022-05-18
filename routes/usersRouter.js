const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const bcrypt = require("bcrypt");

//Get All Users
router.get("/", async function (req, res) {
  const users = await User.find();
  return res.send(users);
});

//Login
router.post("/login", async function (req, res) {
  /**
   * email, password
   * Check email exist in db, if not return not found user
   * if exist user, check password hash vs password in db
   *    if !match return un authozired
   *    if match login success
   *
   */
  if (!req.body.email || !req.body.password) {
    return res.status(401).send("email and password is required");
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).send("User not found");
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).send("Username or password is not correct");
  }
  return res.send(user);
});

//Register a user
router.post("/register", function (req, res) {
  let user = User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    fullname: req.body.fullname,
  });
  user
    .save()
    .then((newUser) => {
      res.status(200).send(newUser);
    })
    .catch((err) => res.status(404).send(err));
});
module.exports = router;
