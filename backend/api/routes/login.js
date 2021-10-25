import { default as controller } from '../controllers/index.js';
import express from 'express';

export const router = express.Router();
router.post('/admin', controller.Auth.adminLogin);
router.post('/school', controller.Auth.schoolLogin);
router.post('/teacher', controller.Auth.teacherLogin);
router.post('/student', controller.Auth.studentLogin);
