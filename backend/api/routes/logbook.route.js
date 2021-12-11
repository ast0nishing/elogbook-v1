/** @format */

import { default as controller } from "../controllers/index.js";
import express from "express";
import auth from "../middlewares/auth.js";

export const router = express.Router();

router.post("/", auth.verifyToken, auth.isTeacher, controller.Logbook.create);

// router.get(
//   "/:year",
//   [auth.verifyToken, auth.isTeacher],
//   controller.Logbook.findByYear
// );
// router.get(
//   "/:year/:idSchool/",
//   [auth.verifyToken, auth.isTeacher],
//   controller.Logbook.findByClass
// );
router.get(
  "/:year/:week",
  [auth.verifyToken, auth.isTeacher],
  controller.Logbook.findByYearAndWeek
);
router.get(
  "/:year/:idSchool/:week",
  [auth.verifyToken, auth.isTeacher],
  controller.Logbook.findByYearClassWeek
);

// router.get("/:studentId", controller.Logbook.findByStudent);
