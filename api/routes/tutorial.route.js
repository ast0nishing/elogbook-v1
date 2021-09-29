import { default as tutorials } from '../controllers/tutorial.controller.js';
import express from 'express';

const router = express.Router();

router.route('/').post((req, res) => {
    tutorials.create(req, res);
});
router.route('/').get((req, res) => {
    res.send('asd');
});

export default router;
