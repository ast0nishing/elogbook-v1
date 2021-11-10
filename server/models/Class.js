/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  school: {
    type: Schema.Types.ObjectId,
    ref: "school",
    required: true,
  },
  classname: {
    type: String,
    required: true,
  },
  acedemicyear: {
    type: Schema.Types.ObjectId,
    ref: "academicyear",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("class", ClassSchema);
