import { default as controller } from '../controllers/index.js';
import express from 'express';
import authJwt from '../middlewares/authJwt.js';

export const router = express.Router();

// info of all students in class
router.get(
    '/',
    [authJwt.verifyToken, authJwt.isSchool],
    controller.Student.findAllStudents
);
// get info of the student
router.get(
    '/:studentId',
    [authJwt.verifyToken, authJwt.isStudent],
    controller.Student.findStudent
);

// ranking by year + week
router.get(
    '/ranking/:year/byweek/:week',
    [authJwt.verifyToken, authJwt.isStudent],
    controller.Student.rankingByWeek
);

// ranking by year
router.get(
    '/ranking/:year',
    [authJwt.verifyToken, authJwt.isStudent],
    controller.Student.rankingByYear
);

// update password
router.put(
    '/updatePassword',
    [authJwt.verifyToken, authJwt.isStudent],
    controller.Student.updatePassword
);
