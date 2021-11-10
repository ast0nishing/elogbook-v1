/** @format */

const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Academicyear = require("../models/Academicyear");

// @route GET api/posts
// @desc Get posts
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const academicyears = await Academicyear.find({
      user: req.userId,
    }).populate("user", ["username"]);
    res.json({ success: true, academicyears });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { academicyear, semester } = req.body;

  // Simple validation
  if (!academicyear)
    return res
      .status(400)
      .json({ success: false, message: "Academic year is required" });

  try {
    const newAcademicyear = new Academicyear({
      academicyear,
      semester,
      user: req.userId,
    });

    await newAcademicyear.save();

    res.json({
      success: true,
      message: "Happy learning!",
      academicyear: newAcademicyear,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/posts
// @desc Update post
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { academicyear, semester } = req.body;

  // Simple validation
  if (!academicyear)
    return res
      .status(400)
      .json({ success: false, message: "Academic year is required" });

  try {
    let updatedAcademicyear = {
      academicyear,
      semester,
      user: req.userId,
    };

    const academicyearUpdateCondition = {
      _id: req.params.id,
      user: req.userId,
    };

    updatedAcademic = await Academicyear.findOneAndUpdate(
      academicyearUpdateCondition,
      updatedAcademicyear,
      { new: true }
    );

    // User not authorised to update post or post not found
    if (!updatedAcademicyear)
      return res.status(401).json({
        success: false,
        message: "Academic year not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      academicyear: updatedAcademicyear,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const academicyearDeleteCondition = {
      _id: req.params.id,
      user: req.userId,
    };
    const deletedAcademicyear = await Academicyear.findOneAndDelete(
      academicyearDeleteCondition
    );

    // User not authorised or post not found
    if (!deletedAcademicyear)
      return res.status(401).json({
        success: false,
        message: "Academic year not found or user not authorised",
      });

    res.json({
      success: true,
      academicyear: deletedAcademicyear,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
