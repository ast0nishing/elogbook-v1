/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("course", CourseSchema);
