import express from 'express';
import cors from 'cors';
import { default as route } from './routes/index.js';
const app = express();

// sync to database if not exists
// await database.sequelize.sync({ force: true });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
route(app);

app.use('*', (req, res) => {
    res.status(404).json({ error: 'not found' });
});

export default app;
