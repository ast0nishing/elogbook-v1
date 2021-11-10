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
    const students = await User.find({ id: "04" });
    res.json({ success: true, students });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// @route POST api/auth/register
// @desc Register user
// @access Public
router.post("/", verifyToken, async (req, res) => {
  const auth = await User.findById(req.userId).select("role");
  if (auth === "student" || !auth)
    return res.status(400).json({
      success: false,
      message: "User not found or do not have authority",
    });

  const { username, password, role, fullname, phone, id } = req.body;
  // Simple validation
  if (!username || !password || !role || !fullname || !phone || !id)
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
      id,
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

// // @route POST api/auth/login
// // @desc Login user
// // @access Public
// router.post("/login", async (req, res) => {
//   const { username, password, role } = req.body;

//   // Simple validation
//   if (!username || !password)
//     return res
//       .status(400)
//       .json({ success: false, message: "Missing username and/or password" });

//   try {
//     // Check for existing user
//     const user = await User.findOne({ username });
//     if (!user)
//       return res
//         .status(400)
//         .json({ success: false, message: "Incorrect username or password" });

//     // Username found
//     const passwordValid = await argon2.verify(user.password, password);
//     if (!passwordValid)
//       return res
//         .status(400)
//         .json({ success: false, message: "Incorrect username or password" });

//     // All good
//     // Return token
//     const accessToken = jwt.sign(
//       { userId: user._id },
//       process.env.ACCESS_TOKEN_SECRET
//     );

//     res.json({
//       success: true,
//       message: "User logged in successfully",
//       accessToken,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

module.exports = router;
