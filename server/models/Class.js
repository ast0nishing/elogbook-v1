/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  school: {
    type: Schema.Types.ObjectId,
    ref: "school",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  acedemicyear: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("class", ClassSchema);
