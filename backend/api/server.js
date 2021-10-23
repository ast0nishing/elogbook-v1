import express from "express";
import cors from "cors";
import { default as db } from "./models/index.js";
import { default as route } from "./routes/index.js";
const app = express();

const database = await db();

// sync to database if not exists
await database.sequelize.sync({ force: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
route(app);
console.log("loaded routes");
app.get("/", (req, res) => {
  res.status(200).send("heheh111");
});
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
