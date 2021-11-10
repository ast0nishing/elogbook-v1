/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AcademicyearSchema = new Schema({
  academicyear: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});
module.exports = mongoose.model("academicyear", AcademicyearSchema);
