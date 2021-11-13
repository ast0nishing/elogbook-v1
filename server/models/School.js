/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  street: {
    type: String,
  },
  streetNo: {
    type: String,
  },
  createAT: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    required: true,
    default: "school",
  },
});

module.exports = mongoose.model("school", SchoolSchema);
