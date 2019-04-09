const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Prescription = require("../models/prescription");
const multer = require("multer");
var fs = require("fs");

const MIME_TYPE_MAP = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg"
};

const fileDest = "images/";

var upload = multer({ dest: fileDest });
router.use(upload.single("image"));

router.post("/prescription", (req, res, next) => {
  console.log("Prescription");
  console.log(JSON.stringify(req.body));
  console.log(req.file);

  const prescriptionId = mongoose.Types.ObjectId();
  filename = prescriptionId + MIME_TYPE_MAP[req.file.mimetype];

  fs.rename(req.file.path, fileDest + filename, function(err) {
    if (err) console.log("ERROR: " + err);
  });

  const prescription = new Prescription({
    _id: prescriptionId,
    name: req.body.name,
    email: req.body.email,
    imagePath: fileDest + filename
  });
  prescription
    .save()
    .then(result => {
      res.status(201).json({
        message: "Prescription added",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
