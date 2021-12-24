/** @format */

import { default as controller } from "../controllers/index.js";
import express from "express";
import auth from "../middlewares/auth.js";

export const router = express.Router();

// info of all students in class
// router.get(
//     '/',
//     [auth.verifyToken, auth.isSchool],
//     controller.Student.findAllStudents
// );
// get info of the student
router.get(
  "/",
  [auth.verifyToken, auth.isStudent],
  controller.Student.findStudent
);
router.put(
  "/",
  [auth.verifyToken, auth.isStudent],
  controller.Student.editSelf
);

// ranking by year + week
router.get(
  "/ranking/:year/:week",
  [auth.verifyToken, auth.isStudent],
  controller.Student.rankingByWeek
);
router.get(
  "/ranking/:year/:week/:grade",
  [auth.verifyToken, auth.isStudent],
  controller.Student.rankingByGrade
);
router.get(
  "/teachers",
  [auth.verifyToken, auth.isStudent],
  controller.Student.getTeachers
);

// ranking by year
router.get(
  "/ranking/:year",
  [auth.verifyToken, auth.isStudent],
  controller.Student.rankingByYear
);
router.get(
  "/timetable/:year/:week",
  [auth.verifyToken, auth.isStudent],
  controller.Student.timetableByYearAndWeek
);

// update password
router.put(
  "/updatePassword",
  [auth.verifyToken, auth.isStudent],
  controller.Student.updatePassword
);
