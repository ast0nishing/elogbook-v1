import { default as admin } from "./admin.controller.js";
import { default as school } from "./school.controller.js";
// import { default as logbook } from './logbook.controller.js';
// import { default as student } from './student.controller.js';
// import { default as teacher } from './teacher.controller.js';
import { default as auth } from "./auth.controller.js";

export default {
  Auth: auth,
  Admin: admin,
  School: school,
  // Logbook: logbook,
  // Student: student,
  // Teacher: teacher,
};
