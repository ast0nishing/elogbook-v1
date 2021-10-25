import { default as admin } from "./admin.controller.js";
import { default as school } from "./school.controller.js";
import { default as auth } from "./auth.js";

export default {
  School: school,
  Auth: auth,
  Admin: admin,
};
