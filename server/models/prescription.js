const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  orderNumber: Number,
  name: String,
  email: String,
  phoneNumber: String,
  imagePath : String
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;

