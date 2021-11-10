/** @format */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogbookSchema = new Schema({
  week: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  grade: {
    type: String,
    required: true,
    enum: ["A", "A+", "A-", "B+", "B", "B-", "C", "C-", "C+"],
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
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("logbook", LogbookSchema);
