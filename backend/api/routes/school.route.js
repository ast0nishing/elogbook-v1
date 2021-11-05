import { default as controller } from "../controllers/index.js";
import express from "express";
import authJwt from "../middlewares/auth.js";

export const router = express.Router();
router.get("/", (req, res) => {
  return res.status(200).json("Hello");
});
router.post("/createClass", authJwt, controller.School.createClass);
router.post("/createTeacher", authJwt, controller.School.createTeacher);
router.post("/createStudent", authJwt, controller.School.createStudent);
router.post("/createTimeTable", authJwt, controller.School.createTimeTable);

router.post("/addStudent", authJwt, controller.School.classAddStudents);
router.post("/addTeacher", authJwt, controller.School.classAddTeacher);

// // get all teacher of a class in a year
// router.get(
//     '/:year/:className/teachers',
//     authJwt.verifyToken,
//     controller.School.findAllTeachersByClassAndYear
// );
// router.get('/teachers', controller.School.findAllTeachers);
