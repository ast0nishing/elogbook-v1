import { default as controller } from '../controllers/index.js';
import express from 'express';
import authJwt from '../middlewares/authJwt.js';

export const router = express.Router();

router.get('/', controller.Logbook.findAll);
router.post('/', authJwt.verifyToken, controller.Logbook.create);
router.get('/:className/', controller.Logbook.findOne);
