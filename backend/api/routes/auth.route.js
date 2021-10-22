import authJwt from '../middlewares/authJwt.js';
import {
    signInAtModerator,
    signInAtStudent,
    signInAtTeacher,
} from '../controllers/auth.controller.js';

import express from 'express';

export const router = express.Router();
// router.post('/signin/admin', signInAtAdmin);
router.post('/signin/moderator', signInAtModerator);
router.post('/signin/teacher', signInAtTeacher);
router.post('/signin/student', signInAtStudent);
router.get(
    '/test/mod',
    [authJwt.verifyToken, authJwt.isModerator],
    (req, res) => {
        res.status(200).send('you are moderator');
    }
);
router.get(
    '/test/teacher',
    [authJwt.verifyToken, authJwt.isTeacher],
    (req, res) => {
        res.status(200).send('you are teacher');
    }
);
router.get(
    '/test/student',
    [authJwt.verifyToken, authJwt.isStudent],
    (req, res) => {
        res.status(200).send('you are student');
    }
);
