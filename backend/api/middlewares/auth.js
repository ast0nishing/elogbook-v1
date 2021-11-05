import passport from "passport";
import httpStatus from "http-status";

export default (req, res, next) =>
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
