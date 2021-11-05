import { router as schoolRoute } from "./school.route.js";
import { router as admin } from "./admin.route.js";
// import { router as logbookRoute } from "./logbook.route.js.js";
// import { router as studentRoute } from "./student.route.js.js";
// import { router as teacherRoute } from "./teacher.route.js.js";
import { router as auth } from "./authen.js";

export default (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
      "Authorizaton"
    );
    next();
  });
  app.use("/admin", admin);
  app.use("/auth", auth);
  app.use("/api/v1/schools", schoolRoute);

  //   app.use("/api/v1/logbooks", logbookRoute);
  //   app.use("/api/v1/students", studentRoute);
  //   app.use("/api/v1/teachers", teacherRoute);
};
