import { default as controller } from "../controllers/index.js";
import express from "express";
import { default as authJwt } from "../middlewares/auth.js";

export const router = express.Router();
router.post("/login", controller.Auth.login);
router.post("/refresh-token", controller.Auth.refreshToken);

// need token
router.post("/change-password", authJwt, controller.Auth.changePassword);
router.get("/log-out-all-devices", authJwt, controller.Auth.logOutAll);

// router.post("/login/school", controller.Auth.schoolLogin);
// router.post('/teacher', controller.Auth.teacherLogin);
// router.post('/student', controller.Auth.studentLogin);
