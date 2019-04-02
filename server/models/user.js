const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
   // _id: mongoose.Schema.Types.ObjectId,
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true},
    Address1: {type: String, required: true},
    Address2: {type: String, required: true},
    city: {type: String, required: true},
    postalCode: {type: String, required: true}
  });


  //userSchema.plugin(uniqueValidator);
  const User = mongoose.model("User",userSchema);
  module.exports = User;