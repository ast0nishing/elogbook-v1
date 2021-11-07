import { default as controller } from "../controllers/index.js";
import express from "express";
import auth from "../middlewares/auth.js";

export const router = express.Router();
router.post("/createAdmin", controller.Admin.createAdmin);
router.post(
  "/createSchool",
  auth.verifyToken,
  auth.isAdmin,
  controller.Admin.createSchool
);
router.post(
  "/createCourse",
  auth.verifyToken,
  auth.isAdmin,
  controller.Admin.createCourse
);
router.post(
  "/createLesson",
  auth.verifyToken,
  auth.isAdmin,
  controller.Admin.createLesson
);
