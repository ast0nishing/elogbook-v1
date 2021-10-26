import { default as controller } from '../controllers/index.js';
import express from 'express';
import authJwt from '../middlewares/authJwt.js';

export const router = express.Router();

router.get(
    '/:year',
    [authJwt.verifyToken, authJwt.isTeacher],
    controller.Logbook.findAll
);
router.post('/', authJwt.verifyToken, controller.Logbook.create);
router.get(
    '/:year/:className/',
    [authJwt.verifyToken, authJwt.isTeacher],
    controller.Logbook.findByClass
);
router.get(
    '/:year/:className/:day',
    [authJwt.verifyToken, authJwt.isTeacher],
    controller.Logbook.findByClassAndDay
);
router.get('/:studentId', controller.Logbook.findByStudent);
