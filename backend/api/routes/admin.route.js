import { default as controller } from "../controllers/index.js";
import express from "express";
import authJwt from "../middlewares/authJwt.js";
import auth from "../controllers/auth.js";

export const router = express.Router();
// router.post("/createSchool", controller.Admin.createSchool);
router.post(
  "/createSchool",
  authJwt.verifyToken,
  authJwt.isAdmin,
  controller.Admin.createSchool
);
// router.post("/createAdmin", controller.Admin.createAdmin);
router.post(
  "/createCourse",
  authJwt.verifyToken,
  authJwt.isAdmin,
  controller.Admin.createCourse
);
router.post(
  "/createLesson",
  authJwt.verifyToken,
  authJwt.isAdmin,
  controller.Admin.createLesson
);
// router.get("/", controller.User.findAll);
// router.get("/:id/", controller.User.findOne);
// router.put("/:id/", controller.User.update);
// router.delete("/:id/", controller.User.delete);
