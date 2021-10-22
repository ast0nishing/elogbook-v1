import { default as teacher } from '../controllers/teacher.controller.js';
import authJwt from '../middlewares/authJwt.js';
import express from 'express';

export const router = express.Router();
router.get(
    '/teacher',
    [authJwt.verifyToken, authJwt.isTeacher, authJwt.teacherBelongToSchool],
    teacher.findAll
);
