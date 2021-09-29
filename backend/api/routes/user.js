import { default as User } from '../controllers/user.js';
import express from 'express';

const router = express.Router();

router.route('/').post((req, res) => {
    User.create(req, res);
});
router.route('/').get((req, res) => {
    res.send('user');
});

export default router;
