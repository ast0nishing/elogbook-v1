import { default as controller } from '../controllers/index.js';
import express from 'express';
import auth from '../middlewares/auth.js';

export const router = express.Router();
router.get('/', (req, res) => {
    return res.status(200).json('Hello');
});
router.post(
    '/createClass',
    auth.verifyToken,
    auth.isSchool,
    controller.School.createClass
);
router.post(
    '/createTeacher',
    auth.verifyToken,
    auth.isSchool,
    controller.School.createTeacher
);
router.post(
    '/createStudent',
    auth.verifyToken,
    auth.isSchool,
    controller.School.createStudent
);
router.post(
    '/createTimeTable',
    auth.verifyToken,
    auth.isSchool,
    controller.School.createTimeTable
);

router.post(
    '/addStudent',
    auth.verifyToken,
    auth.isSchool,
    controller.School.classAddStudents
);
router.post(
    '/addTeacher',
    auth.verifyToken,
    auth.isSchool,
    controller.School.classAddTeacher
);

// // get all teacher of a class in a year
router.get(
    '/:year/:className/teachers',
    auth.verifyToken,
    controller.School.findAllTeachersByClassAndYear
);
router.get('/teachers', auth.verifyToken, controller.School.findAllTeachers);
