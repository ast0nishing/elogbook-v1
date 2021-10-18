import app from "./api/server.js";
import { default as db } from "./api/models/index.js";

const port = process.env.PORT || 5000;
console.log(`Server is listening on http://localhost:${port}`);

// const database = db();

// (async () => {
//   try {
//     // await db.sequelize.sync();

//     app.listen(port, () => {
//       console.log(`Server is listening on http://localhost:${port}`);
//     });
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// })();
