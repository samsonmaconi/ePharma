const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  name: String,
  email: String,
  imagePath : String
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;
