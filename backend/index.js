<<<<<<< HEAD
import dotenv from "dotenv";
dotenv.config();

import app from "./api/server.js";
import db from "./api/models/index.js";

(async () => {
  const port = process.env.PORT || 3000;
  try {
    await db.sequelize.sync();
    app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
=======
import app from "./api/server.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
>>>>>>> 389c7cd0faca020fa9ccf63e2cc6c3764f549c74
