import { default as User } from '../controllers/user.js';
import express from 'express';

const router = express.Router();

router.post('/', User.create);
router.get('/', User.findAll);
router.get('/:username/', User.findOne);
router.put('/:username/', User.update);
router.delete('/:username/', User.delete);

export default router;
