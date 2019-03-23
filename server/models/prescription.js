const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  orderNumber: Number,
  name: String,
  email: String,
  phoneNumber: Number,
  imagePath : String
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;
