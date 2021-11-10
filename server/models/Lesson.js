/** @format */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  concept: {
    type: String,
    required: true,
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: "school",
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: "class",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  acedemicyear: {
    type: Schema.Types.ObjectId,
    ref: "academicyear",
    required: true,
  },
});

module.exports = mongoose.model("lessson", LessonSchema);
