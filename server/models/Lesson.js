/** @format */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stt: {
    type: String,
    enum: ["Backup", "Normal"],
    required: true,
    default: "Normal",
  },
});

module.exports = mongoose.model("lesson", LessonSchema);
