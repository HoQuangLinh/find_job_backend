const express = require("express");
const router = express.Router();

const { multerUploads } = require("../middlewares/multer");
const { cloudinary } = require("../config/cloudinary");

const getFileBuffer = require("../middlewares/getFileBuffer");
const path = require("path");
//Hash Pass
const bcrypt = require("bcrypt");

const { Candidate } = require("../models/Candidate");

router.get("/", async (request, response) => {
  let candidates = await Candidate.find();
  if (candidates) {
    return response.send(candidates);
  } else {
    return response.send("Server Errors");
  }
});

//Get Info
router.get("/:id", async function (req, res) {
  if (!req.params.id) {
    return res.status(400).send("Error");
  }
  let info = await Candidate.findById(req.params.id);
  if (!info) {
    return res.status(422).send("Info not found");
  } else return res.status(200).send(info);
});

// Register
router.post("/", multerUploads, async (req, res) => {
  const urlDefault =
    "https://res.cloudinary.com/hoquanglinh/image/upload/v1635330645/profile_ieghzz.jpg";

  if (req.file) {
    const buffer = req.file.buffer;
    const file = getFileBuffer(path.extname(req.file.originalname), buffer);

    //upload file to clould
    var image = await cloudinary.uploader.upload(file, {
      folder: "Linh",
    });
  }

  let candidate = Candidate({
    cmnd: req.body.cmnd,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    gender: req.body.gender,
    birthday: req.body.birthday,
    avatar: image ? image.url : urlDefault,
  });

  candidate
    .save()
    .then((newCandidate) => {
      res.status(200).send(newCandidate);
    })
    .catch(async (err) => {
      if (image) {
        await cloudinary.uploader.destroy(
          image.public_id,
          function (err, result) {
            if (err) {
              res.status(500).send(err);
            }
          }
        );
      }

      res.status(400).send(err);
    });
});
//Update Candidate
router.put("/update/:id", multerUploads, async (req, res) => {
  let candidate = await Candidate.findById(req.params.id);
  if (!candidate) return res.status(500).send("Not found candidate");
  if (req.file) {
    const buffer = req.file.buffer;
    const file = getFileBuffer(path.extname(req.file.originalname), buffer);

    //upload file to clould
    var image = await cloudinary.uploader.upload(file, {
      folder: "Linh",
    });
  }

  if (image) {
    var updatedCandidate = {
      cmnd: req.body.cmnd,
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      gender: req.body.gender,
      birthday: req.body.birthday,
      avatar: image ? image.url : urlDefault,
    };
  } else {
    var updatedCandidate = {
      cmnd: req.body.cmnd,
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      gender: req.body.gender,
      birthday: req.body.birthday,
    };
  }
  Candidate.findByIdAndUpdate(
    req.params.id,
    updatedCandidate,
    { new: true },
    async function (err, doc) {
      if (err) {
        res.status(400).send(err);
      } else {
        console.log("Cập nhập thông tin ứng viên thành công");
        res.status(200).send(doc);
      }
    }
  );
});

router.delete("/deleteOnebyId/:id", async function (req, res) {
  if (req.params.id) {
    await Candidate.findByIdAndRemove(req.params.id)
      .then((result) => {
        console.log("Removed candidate: ", result);
        res.status(200).send("Removed candidate:" + result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  }
});
module.exports = router;
