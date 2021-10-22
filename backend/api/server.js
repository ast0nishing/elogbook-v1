import express from 'express';
import cors from 'cors';
import { default as db } from './models/index.js';
import { default as route } from './routes/index.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);

app.use('*', (req, res) => {
    res.status(404).json({ error: 'not found' });
});

export default app;
