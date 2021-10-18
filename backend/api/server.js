import express from "express";
// import cors from 'cors';
// import tutorialRoute from './api/routes/tutorial.route.js';
// import userRoute from './routes/user.route.js';
import { default as route } from "./routes/index.js";
import httpStatus from "http-status";
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);
// app.use('api/v1', route);
app.listen(PORT, () => {
  console.log(`Server is initalize on port ${PORT}`);
});
// app.use("*", (req, res) => {
//   res.status(404).json({ error: "not found" });
// });
// app.get("/", (req, res) => {
//   return res.status(httpStatus.OK).json({ msg: "welcome" });
// });

export default app;
