/** @format */

import { default as controller } from "../controllers/index.js";
import express from "express";
import auth from "../middlewares/auth.js";

export const router = express.Router();

// get all teachers of a class of the school
// router.get(
//     '/',
//     [auth.verifyToken, auth.isTeacher],
//     controller.Teacher.findAllTeachers
// );

// get all teachers of the school
router.get("/", [auth.verifyToken, auth.isTeacher], controller.Teacher.getSelf);
router.put(
  "/",
  [auth.verifyToken, auth.isTeacher],
  controller.Teacher.editSelf
);
router.get(
  "/getTeachers/:year/:className",
  [auth.verifyToken, auth.isTeacher],
  controller.Teacher.findAllTeachersByClassAndYear
);
router.get(
  "/getStudent/:studentId",
  [auth.verifyToken, auth.isTeacher],
  controller.Teacher.findStudent
);
router.get(
  "/getClass/:classId",
  [auth.verifyToken, auth.isTeacher],
  controller.Teacher.findClass
);
router.get(
  "/timetable/:week/:classId",
  [auth.verifyToken, auth.isTeacher],
  controller.Teacher.timetableByWeekAndClass
);
router.get(
  "/timetables/:year/:week",
  [auth.verifyToken, auth.isTeacher],
  controller.Teacher.timetablesByYearAndWeek
);

// get logbook data
router.get(
  "/logbook/:logbookId",
  [auth.verifyToken, auth.isTeacher],
  controller.Teacher.getLogbookById
);
// update password
router.put(
  "/updatePassword",
  [auth.verifyToken, auth.isTeacher],
  controller.Teacher.updatePassword
);
// update logbook
router.put(
  "/logbook/:logbookId",
  [auth.verifyToken, auth.isTeacher],
  controller.Teacher.updateLogbook
);
router.put(
  "/student/:studentId",
  [auth.verifyToken, auth.isTeacher],
  controller.Teacher.editStudent
);
router.get(
  "/mytimetable/:year/:week",
  [auth.verifyToken, auth.isTeacher],
  controller.Teacher.getTimetable
);
// router.get(
//     '/:year/:className/',
//     [authJwt.verifyToken, authJwt.isTeacher],
//     controller.Logbook.findByClass
// );
// ranking by year + week
router.get(
  "/ranking/:year/:week",
  [auth.verifyToken, auth.isTeacher],
  controller.Student.rankingByWeek
);
router.get(
  "/ranking/:year/:week/:grade",
  [auth.verifyToken, auth.isTeacher],
  controller.Student.rankingByGrade
);

// ranking by year
router.get(
  "/ranking/:year",
  [auth.verifyToken, auth.isTeacher],
  controller.Student.rankingByYear
);
// get lesson
router.get(
  "/lessons/:course",
  [auth.verifyToken, auth.isTeacher],
  controller.Teacher.getLessons
);
