import { default as controller } from '../controllers/index.js';
import express from 'express';

export const router = express.Router();
router.post('/', controller.User.create);
router.get('/', controller.User.findAll);
router.get('/:id/', controller.User.findOne);
router.put('/:id/', controller.User.update);
router.delete('/:id/', controller.User.delete);
