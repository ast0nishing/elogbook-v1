import { default as controller } from '../controllers/index.js';
import express from 'express';

export const router = express.Router();
router.post('/', controller.School.create);
router.get('/', controller.School.findAll);
router.get('/:id/', controller.School.findOne);
router.put('/:id/', controller.School.update);
router.delete('/:id/', controller.School.delete);
