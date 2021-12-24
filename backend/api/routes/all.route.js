/** @format */

import { default as controller } from "../controllers/index.js";
import express from "express";
import auth from "../middlewares/auth.js";

export const router = express.Router();
// ranking by year + week
router.get(
  "/academicYear",
  [auth.verifyToken],
  controller.All.getAcademicYears
);

router.get("/classes", [auth.verifyToken], controller.All.getClasses);
