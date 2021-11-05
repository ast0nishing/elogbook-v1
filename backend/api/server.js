import express from "express";
import cors from "cors";
import { default as route } from "./routes/index.js";
// web token
import { default as jwt } from "./utils/jwt.js";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import passport from "passport";

// SEQUELIZE
import { default as db } from "./models/index.js";
// sync to database if not exists
// await db.sequelize.sync({ force: true });

// EXPRESS
const app = express();
app.use(cors());
app.get("/", (req, res) => {
  return res.status(httpStatus.OK).json({ message: "App is working" });
});

// define http bearer strategy

const getUserStrategy = {
  admin: async (id) => {
    const user = await db.admin.findOne({ where: { id } });
    return user.toJSON();
  },
  school: async (id) => {
    const user = await db.school.findOne({ where: { id } });
    return user.toJSON();
  },
  teacher: async (id) => {
    const user = await db.teacher.findOne({ where: { id } });
    return user.toJSON();
  },
  student: async (id) => {
    const user = await db.student.findOne({ where: { id } });
    return user.toJSON();
  },
};

const verify = async (token, done) => {
  try {
    const decodedToken = await jwt.verifyAccessToken(token);

    if (!decodedToken) {
      console.log("Decoded failure");
      return done(new Error("Invalid Token"));
    }
    // Get user info by role
    const user = await getUserStrategy[decodedToken.role](decodedToken.sub);
    const userInfo = {
      id: user.id,
      role: user.role,
      schoolId: user.schoolId || "",
    };
    return done(null, userInfo);
  } catch (err) {
    return done(err);
  }
};
const strategy = new BearerStrategy(verify);

// passport -- using bearer strategy
app.use(passport.initialize());
passport.use("jwt", strategy);

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTE
route(app);

export default app;
