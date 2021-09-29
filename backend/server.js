import express from 'express';
// import cors from 'cors';
// import tutorialRoute from './api/routes/tutorial.route.js';
import userRoute from './api/routes/user.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api/v1/tutorials', tutorialRoute);
app.use('/api/v1/users', userRoute);
app.use('*', (req, res) => {
    res.status(404).json({ error: 'not found' });
});
export default app;
