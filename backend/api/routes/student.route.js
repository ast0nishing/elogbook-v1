import { default as controller } from '../controllers/index.js';
import express from 'express';
import auth from '../middlewares/auth.js';

export const router = express.Router();

// info of all students in class
// router.get(
//     '/',
//     [auth.verifyToken, auth.isSchool],
//     controller.Student.findAllStudents
// );
// get info of the student
router.get(
    '/',
    [auth.verifyToken, auth.isStudent],
    controller.Student.findStudent
);
router.put(
    '/',
    [auth.verifyToken, auth.isStudent],
    controller.Student.editSelf
);

// ranking by year + week
router.get(
    '/ranking/:year/byweek/:week',
    [auth.verifyToken, auth.isStudent],
    controller.Student.rankingByWeek
);

// ranking by year
router.get(
    '/ranking/:year',
    [auth.verifyToken, auth.isStudent],
    controller.Student.rankingByYear
);
router.get(
    '/timetable/:week',
    [auth.verifyToken, auth.isStudent],
    controller.Student.timetableByWeek
);

// update password
router.put(
    '/updatePassword',
    [auth.verifyToken, auth.isStudent],
    controller.Student.updatePassword
);
