import app from "./api/server.js";

import { config } from "dotenv";
config();

console.log(process.env.PORT);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
