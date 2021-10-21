import jwt from "jsonwebtoken";
import { default as config } from "../config/auth.config.js";
// import db from "../models/index.js";
import { default as db } from "../models/index.js";

// const Admin = db.admin;
const database = await db();
const Moderator = database.school;
const Teacher = database.teacher;
const Student = database.student;
const Admin = database.admin;

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    console.log(`HAHA`);

    await jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        console.log(`HAHA`);
        return res.status(401).send({ message: "Unauthorized!" });
      }
      console.log(`HIHI`);
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};

// const isAdmin = (req, res, next) => {
//   const admin = await database.admin.findOne({ where: { id: req.userId } });
//   if (!admin) {
//     return false;
//   }
//   console.log(req.body.userId);
//   return true;
// };
const isAdmin = (req, res, next) => {
  Admin.findOne({
    where: { id: req.userId },
  }).then((user) => {
    if (!user) {
      return res.status(500).send({ message: "User Not found." });
    }
    next();
  });
};

const isModerator = (req, res, next) => {
  Moderator.findOne({
    where: { id: req.userId },
  }).then((user) => {
    if (!user) {
      return res.status(500).send({ message: "User Not found." });
    }
    next();
  });
};
const isTeacher = (req, res, next) => {
  Teacher.findOne({
    where: { id: req.userId },
  }).then((user) => {
    if (!user) {
      return res.status(500).send({ message: "User Not found." });
    }

    next();
  });
};
const isStudent = (req, res, next) => {
  Student.findOne({
    where: { username: req.body.username },
  }).then((user) => {
    if (!user) {
      return res.status(500).send({ message: "User Not found." });
    }
    next();
  });
};
const authJwt = {
  verifyToken,
  isModerator,
  isTeacher,
  isStudent,
  isAdmin,
};
export default authJwt;
