/** @format */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
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
  teacher: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "teacher",
  },
});

module.exports = mongoose.model("student", StudentSchema);
