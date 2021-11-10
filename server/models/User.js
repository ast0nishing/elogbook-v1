/** @format */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Duplicate the ID field.
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
  },
  phone: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["admin", "school", "teacher", "student"],
    required: true,
  },
  id: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("user", UserSchema);
