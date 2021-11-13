/** @format */
const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const User = require("../models/User");
const Student = require("../models/Student");
const School = require("../models/School");

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json({ success: true, students });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/student
// @desc Create student from the admin, school and teacher
// @access Public
router.post("/", verifyToken, async (req, res) => {
  const auth = await User.findById(req.userId).select("role");
  if (auth === "student" || !auth)
    return res.status(400).json({
      success: false,
      message: "User not found or do not have authority",
    });

  const { username, password, role, fullname, phone } = req.body;
  // Simple validation
  if (!username || !password || !role || !fullname || !phone)
    return res.status(400).json({
      success: false,
      message: "Missing information",
    });
  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });

    // Checking for existing school
    // const classname = await Class.findOne({ classname });
    // if (!classname)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Class does not exist" });
    // Checking for exiting class
    // const school = await School.findOne({ school });
    // if (!school)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "School does not exist" });
    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      fullname,
      phone,
    });
    await newUser.save();

    res.json({
      success: true,
      message: "User created successfully",
      auth: auth,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/student
// @desc Update student
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { username, password, fullname, phone } = req.body;

  // Simple validation
  if (!username || !password || !fullname || !phone)
    return res.status(400).json({ success: false, message: "Missing infor" });

  try {
    let updatedStudent = {
      username,
      password,
      fullname,
      phone,
    };

    const studentUpdateCondition = {
      _id: req.params.id,
      // user: req.userId,
    };

    updatedStudent = await Student.findOneAndUpdate(
      studentUpdateCondition,
      updatedStudent,
      { new: true }
    );

    //Simple check
    if (!updatedStudent)
      return res.status(401).json({
        success: false,
        message: updatedStudent,
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      student: updatedStudent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/student
// @desc Delete post
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const studentDeleteCondition = {
      _id: req.params.id,
      user: req.userId,
    };
    const deletedStudent = await Student.findOneAndDelete(
      studentDeleteCondition
    );

    // User not authorised or post not found
    if (!deletedStudent)
      return res.status(401).json({
        success: false,
        message: "Student not found or user not authorised",
      });

    res.json({
      success: true,
      student: deletedStudent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
