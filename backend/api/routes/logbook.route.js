import { default as controller } from '../controllers/index.js';
import express from 'express';
import auth from '../middlewares/auth.js';

export const router = express.Router();

router.post('/', auth.verifyToken, auth.isTeacher, controller.Logbook.create);

// router.get(
//     '/:year',
//     [auth.verifyToken, auth.isTeacher],
//     controller.Logbook.findByYear
// );
router.get(
    '/:year/:idSchool/',
    [auth.verifyToken, auth.isTeacher],
    controller.Logbook.findByClass
);
router.get(
    '/:year/:idSchool/:day',
    [auth.verifyToken, auth.isTeacher],
    controller.Logbook.findByClassAndDay
);
router.get(
    '/:year/:idSchool/:week/:day',
    [auth.verifyToken, auth.isTeacher],
    controller.Logbook.findByYearClassWeekDay
);

// router.get("/:studentId", controller.Logbook.findByStudent);
