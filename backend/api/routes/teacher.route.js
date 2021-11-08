import { default as controller } from '../controllers/index.js';
import express from 'express';
import auth from '../middlewares/auth.js';

export const router = express.Router();

// get all teachers of a class of the school
// router.get(
//     '/',
//     [auth.verifyToken, auth.isTeacher],
//     controller.Teacher.findAllTeachers
// );

// get all teachers of the school
router.get(
    '/getTeachers/:year/:className',
    [auth.verifyToken, auth.isTeacher],
    controller.Teacher.findAllTeachersByClassAndYear
);
router.get(
    '/getStudent/:studentId',
    [auth.verifyToken, auth.isTeacher],
    controller.Teacher.findStudent
);
router.get(
    '/getClass/:classId',
    [auth.verifyToken, auth.isTeacher],
    controller.Teacher.findClass
);
// router.get(
//     '/:year/:className/',
//     [authJwt.verifyToken, authJwt.isTeacher],
//     controller.Logbook.findByClass
// );
