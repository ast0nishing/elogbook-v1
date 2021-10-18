import { default as controller } from "../controllers/index.js";
import express from "express";

export const router = express.Router();
router.post("/createSchool", controller.Admin.createSchool);
router.post("/createAdmin", controller.Admin.createAdmin);
router.post("/createCourse", controller.Admin.createCourse);
router.post("/createLesson", controller.Admin.createLesson);
// router.get("/", controller.User.findAll);
// router.get("/:id/", controller.User.findOne);
// router.put("/:id/", controller.User.update);
// router.delete("/:id/", controller.User.delete);
