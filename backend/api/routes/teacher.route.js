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
    '/:year/:className',
    [authJwt.verifyToken, authJwt.isTeacher],
    controller.Teacher.findAllTeachersByClassAndYear
);
