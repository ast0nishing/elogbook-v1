import { default as controller } from '../controllers/index.js';
import express from 'express';
import auth from '../middlewares/auth.js';

export const router = express.Router();

router.post('/', auth.verifyToken, auth.isTeacher, controller.Logbook.create);

// router.get(
//   "/:year",
//   [authJwt.verifyToken, authJwt.isTeacher],
//   controller.Logbook.findAll
// );
router.get(
    '/:year/:className/',
    [auth.verifyToken, auth.isTeacher],
    controller.Logbook.findByClass
);
router.get(
    '/:year/:className/:day',
    [auth.verifyToken, auth.isTeacher],
    controller.Logbook.findByClassAndDay
);
// router.get("/:studentId", controller.Logbook.findByStudent);
