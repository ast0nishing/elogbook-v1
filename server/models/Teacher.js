/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
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
  },
  phoneNumber: {
    type: String,
  },
  major: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "school", "teacher", "student"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  school: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "school",
  },
  class: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "class",
  },
});

module.exports = mongoose.model("teacher", TeacherSchema);
