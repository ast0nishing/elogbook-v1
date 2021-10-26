import { default as controller } from '../controllers/index.js';
import express from 'express';
import authJwt from '../middlewares/authJwt.js';

export const router = express.Router();
router.get(
    '/',
    [authJwt.verifyToken, authJwt.isStudent],
    controller.Student.findClassStudents
);
router.get(
    '/:studentId',
    authJwt.verifyToken,
    controller.Student.findOneStudent
);
