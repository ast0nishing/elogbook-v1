/** @format */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  school: {
    type: Schema.Types.ObjectId,
    ref: "school",
  },
  // classname: {
  //   type: Schema.Types.ObjectId,
  //   ref: "class",
  // },
  acedemicyear: {
    type: Schema.Types.ObjectId,
    ref: "academicyear",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: "True",
  },
});

module.exports = mongoose.model("student", StudentSchema);
