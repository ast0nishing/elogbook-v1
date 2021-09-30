import { default as controller } from '../controllers/index.js';
import express from 'express';

export const router = express.Router();
router.post('/', controller.Logbook.create);
router.get('/', controller.Logbook.findAll);
router.get('/:id/', controller.Logbook.findOne);
router.put('/:id/', controller.Logbook.update);
router.delete('/:id/', controller.Logbook.delete);
