import express from 'express';
// import cors from 'cors';
// import tutorialRoute from './api/routes/tutorial.route.js';
// import userRoute from './routes/user.route.js';
import { default as route } from './routes/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);
// app.use('api/v1', route);
app.use('*', (req, res) => {
    res.status(404).json({ error: 'not found' });
});
export default app;
