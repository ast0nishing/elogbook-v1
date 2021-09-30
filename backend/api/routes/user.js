import { default as User } from '../controllers/user.js';
import express from 'express';

const router = express.Router();

router.post('/', User.create);
router.get('/', User.findAll);
router.get('/:id/', User.findOne);
router.put('/:id/', User.update);
router.delete('/:id/', User.delete);

export default router;
