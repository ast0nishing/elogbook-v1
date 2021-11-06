import { default as controller } from "../controllers/index.js";
import express from "express";
import authJwt from "../middlewares/auth.js";

export const router = express.Router();
router.post("/createAdmin", controller.Admin.createAdmin);
router.post("/createSchool", authJwt, controller.Admin.createSchool);
router.post("/createCourse", authJwt, controller.Admin.createCourse);
router.post("/createLesson", authJwt, controller.Admin.createLesson);
