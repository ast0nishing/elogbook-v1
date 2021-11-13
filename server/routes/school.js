/** @format */

const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const School = require("../models/School");

// @route GET api/posts
// @desc Get posts
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const schools = await School.find({
      user: req.userId,
    }).populate("user", ["username"]);
    res.json({ success: true, schools });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { name, province, district, town } = req.body;

  // Simple validation
  if (!name || !province || !district || !town)
    return res.status(400).json({ success: false, message: "Missing infor" });

  try {
    const newSchool = new School({
      name,
      province,
      district,
      town,
      user: req.userId,
    });

    await newSchool.save();

    res.json({
      success: true,
      message: "Happy learning!",
      school: newSchool,
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
  const { name, province, district, town } = req.body;

  // Simple validation
  if (!name || !province || !district || !town)
    return res.status(400).json({ success: false, message: "Missing infor" });

  try {
    let updatedSchool = {
      name,
      province,
      district,
      town,
      user: req.userId,
    };

    const schoolUpdateCondition = {
      _id: req.params.id,
      user: req.userId,
    };

    updatedSchool = await School.findOneAndUpdate(
      schoolUpdateCondition,
      updatedSchool,
      { new: true }
    );

    // User not authorised to update post or post not found
    if (!updatedSchool)
      return res.status(401).json({
        success: false,
        message: "Academic year not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      school: updatedSchool,
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
    const schoolDeleteCondition = {
      _id: req.params.id,
      user: req.userId,
    };
    const deletedSchool = await School.findOneAndDelete(schoolDeleteCondition);

    // User not authorised or post not found
    if (!deletedSchool)
      return res.status(401).json({
        success: false,
        message: "School not found or user not authorised",
      });

    res.json({
      success: true,
      school: deletedSchool,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
