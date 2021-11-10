/** @format */

// /** @format */

// const express = require("express");
// const router = express.Router();
// const verifyToken = require("../middleware/auth");
// const Course = require("../models/Course");

// // @route GET api/posts
// // @desc Get posts
// // @access Private
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const courses = await Course.find({ user: req.userId }).populate("user", [
//       "username",
//     ]);
//     res.json({ success: true, courses });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// // @route POST api/posts
// // @desc Create post
// // @access Private
// router.post("/", verifyToken, async (req, res) => {
//   const { code, name, school, academicyear } = req.body;

//   // Simple validation
//   if (!code)
//     return res
//       .status(400)
//       .json({ success: false, message: "Code is required" });

//   try {
//     const newCourse = new Course({
//       code,
//       name,
//       school,
//       academicyear,
//       user: req.userId,
//     });

//     await newCourse.save();

//     res.json({ success: true, message: "Happy learning!", course: newCourse });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// // @route PUT api/posts
// // @desc Update post
// // @access Private
// router.put("/:id", verifyToken, async (req, res) => {
//   const { code, name, school, academicyear } = req.body;

//   // Simple validation
//   if (!code)
//     return res
//       .status(400)
//       .json({ success: false, message: "Code is required" });

//   try {
//     let updatedCourse = {
//       code,
//       name,
//       school,
//       academicyear,
//       user: req.userId,
//     };

//     const courseUpdateCondition = { _id: req.params.id, user: req.userId };

//     updatedCourse = await Course.findOneAndUpdate(
//       courseUpdateCondition,
//       updatedCourse,
//       { new: true }
//     );

//     // User not authorised to update post or post not found
//     if (!updatedCourse)
//       return res.status(401).json({
//         success: false,
//         message: "Course not found or user not authorised",
//       });

//     res.json({
//       success: true,
//       message: "Excellent progress!",
//       post: updatedCourse,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// // @route DELETE api/posts
// // @desc Delete post
// // @access Private
// router.delete("/:id", verifyToken, async (req, res) => {
//   try {
//     const courseDeleteCondition = { _id: req.params.id, user: req.userId };
//     const deletedCourse = await courseDeleteCondition.findOneAndDelete(
//       courseDeleteCondition
//     );

//     // User not authorised or post not found
//     if (!deletedCourse)
//       return res.status(401).json({
//         success: false,
//         message: "Course not found or user not authorised",
//       });

//     res.json({ success: true, course: deletedCourse });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// module.exports = router;
