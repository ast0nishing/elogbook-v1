import passport from "passport";
import httpStatus from "http-status";

const authJwt = (req, res, next) =>
  passport.authenticate(
    "jwt",
    { session: false },

    async (error, user) => {
      if (error || !user) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "Invalid accessToken" });
      }
      console.log("---------------------");
      console.log(user);
      console.log("---------------------");

      req.user = user;
      return next();
    }
  )(req, res, next);
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ msg: "user do not have admin authority" });
  }

  return next();
};
const isSchool = (req, res, next) => {
  if (req.user.role !== "school") {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ msg: "user do not have school authority" });
  }
  return next();
};
const isTeacher = (req, res, next) => {
  if (req.user.role !== "teacher") {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json("msg: user do not have teacher authority");
  }
  return next();
};
const isStudent = (req, res, next) => {
  if (req.user.role !== "student") {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json("msg: user do not have student authority");
  }
  return next();
};
const auth = {
  verifyToken: authJwt,
  isAdmin: isAdmin,
  isSchool: isSchool,
  isTeacher: isTeacher,
  isStudent: isStudent,
};
export default auth;
