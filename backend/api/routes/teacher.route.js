import { default as controller } from '../controllers/index.js';
import express from 'express';
import authJwt from '../middlewares/authJwt.js';

export const router = express.Router();

// get all teachers of a class of the school
router.get(
    '/',
    [authJwt.verifyToken, authJwt.isTeacher],
    controller.Teacher.findAllTeachers
);

// get all teachers of the school
router.get(
    '/getTeachers/:year/:className',
    [authJwt.verifyToken, authJwt.isTeacher],
    controller.Teacher.findAllTeachersByClassAndYear
);
router.get(
    '/getStudent/:studentId',
    [authJwt.verifyToken, authJwt.isTeacher],
    controller.Teacher.findStudent
);
router.get(
    '/getClass/:classId',
    [authJwt.verifyToken, authJwt.isTeacher],
    controller.Teacher.findClass
);
