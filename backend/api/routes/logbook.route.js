import { default as controller } from "../controllers/index.js";
import express from "express";

import authJwt from "../middlewares/authJwt.js";
export const router = express.Router();

router.post("/", authJwt.verifyToken, controller.Logbook.create);

router.get("/", controller.Logbook.findAll);
router.get("/:id/", controller.Logbook.findOne);
router.put("/:id/", controller.Logbook.update);
router.delete("/:id/", controller.Logbook.delete);
