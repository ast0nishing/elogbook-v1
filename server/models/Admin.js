/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  school: {
    type: Schema.Types.ObjectId,
    ref: "school",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("admin", AdminSchema);
