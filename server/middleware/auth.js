/** @format */

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

module.exports = verifyToken;

// const passport = require("passport");
// const httpStatus = require("http-status");

// const authJwt = (req, res, next) =>
//   passport.authenticate(
//     "jwt",
//     { session: false },

//     async (error, user) => {
//       if (error || !user) {
//         return res
//           .status(httpStatus.UNAUTHORIZED)
//           .json({ message: "Invalid accessToken" });
//       }
//       console.log("---------------------");
//       console.log(user);
//       console.log("---------------------");

//       req.user = user;
//       return next();
//     }
//   )(req, res, next);
// const isAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res
//       .status(httpStatus.UNAUTHORIZED)
//       .json({ msg: "user do not have admin authority" });
//   }

//   return next();
// };
// const isSchool = (req, res, next) => {
//   if (req.user.role !== "school") {
//     return res
//       .status(httpStatus.UNAUTHORIZED)
//       .json({ msg: "user do not have school authority" });
//   }
//   return next();
// };
// const isTeacher = (req, res, next) => {
//   if (req.user.role !== "teacher") {
//     return res
//       .status(httpStatus.UNAUTHORIZED)
//       .json("msg: user do not have teacher authority");
//   }
//   return next();
// };
// const isStudent = (req, res, next) => {
//   if (req.user.role !== "student") {
//     return res
//       .status(httpStatus.UNAUTHORIZED)
//       .json("msg: user do not have student authority");
//   }
//   return next();
// };
// const auth = {
//   verifyToken: authJwt,
//   isAdmin: isAdmin,
//   isSchool: isSchool,
//   isTeacher: isTeacher,
//   isStudent: isStudent,
// };
// module.exports = auth;
