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
    '/createClassAddStudent',
    auth.verifyToken,
    auth.isSchool,
    controller.School.createClassAddStudent
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
router.get(
    '/teachers',
    auth.verifyToken,
    auth.isSchool,
    controller.School.findAllTeachers
);
router.delete(
    '/deleteTeacher/:teacherId',
    auth.verifyToken,
    auth.isSchool,
    controller.School.deleteTeacher
);
router.delete(
    '/deleteTimetable/:timetableId',
    auth.verifyToken,
    auth.isSchool,
    controller.School.deleteTimetable
);
router.delete(
    '/deleteStudent/:studentId',
    auth.verifyToken,
    auth.isSchool,
    controller.School.deleteStudent
);
router.put(
    '/editStudent/:studentId',
    auth.verifyToken,
    auth.isSchool,
    controller.School.editStudent
);
router.put('/', auth.verifyToken, auth.isSchool, controller.School.editSelf);
router.put(
    '/editTimetable/:timetableId',
    auth.verifyToken,
    auth.isSchool,
    controller.School.editTimetable
);
router.get(
    '/timetable/:year/:week',
    auth.verifyToken,
    auth.isSchool,
    controller.School.getTimetable
);
