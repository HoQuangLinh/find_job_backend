const express = require("express");
const router = express.Router();

const { User } = require("../models/User");
const { multerUploads } = require("../middlewares/multer");
const { cloudinary } = require("../config/cloudinary");

const getFileBuffer = require("../middlewares/getFileBuffer");
const path = require("path");
//Hash Pass
const bcrypt = require("bcrypt");
const { Company } = require("../models/Company");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

router.get("/", async (request, response) => {
  let company = await Company.find();
  if (company) {
    return response.send(company);
  } else {
    return response.send("Server Errors");
  }
});

//Get Info
router.get("/:id", async function (req, res) {
  if (!req.params.id) {
    return res.status(400).send("Error");
  }
  let info = await Company.findById(req.params.id);
  if (!info) {
    return res.status(422).send("Info not found");
  } else return res.status(200).send(info);
});

// Register
router.post("/register", multerUploads, async (req, res) => {
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

  let company = Company({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    tax: req.body.tax,
    address: req.body.address,
    startDate: req.body.startDate,
    avatar: image ? image.url : urlDefault,
    package: req.body.package,
    employer: req.body.employer,
  });

  company
    .save()
    .then((newCompany) => {
      res.status(200).send(newCompany);
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
//Update User
router.put("/update/:id", multerUploads, async (req, res) => {
  let company = await Company.findById(req.params.id);
  if (!company) return res.status(500).send("Not found company");
  if (req.file) {
    const buffer = req.file.buffer;
    const file = getFileBuffer(path.extname(req.file.originalname), buffer);

    //upload file to clould
    var image = await cloudinary.uploader.upload(file, {
      folder: "Linh",
    });
  }

  if (image) {
    var updatedCompany = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      tax: req.body.tax,
      avatar: image.url,
      package: req.body.package,
      employer: req.body.employer,
    };
  } else {
    var updatedCompany = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      tax: req.body.tax,
      package: req.body.package,
      employer: req.body.employer,
    };
  }
  Company.findByIdAndUpdate(
    req.params.id,
    updatedCompany,
    { new: true },
    async function (err, doc) {
      if (err) {
        res.status(400).send(err);
      } else {
        console.log("Cập nhập thông tin công ty thành công");
        res.status(200).send(doc);
      }
    }
  );
});

router.delete("/deleteOnebyId/:id", async function (req, res) {
  if (req.params.id) {
    await Company.findByIdAndRemove(req.params.id)
      .then((result) => {
        console.log("Removed company: ", result);
        res.status(200).send("Removed company:" + result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  }
});
module.exports = router;
