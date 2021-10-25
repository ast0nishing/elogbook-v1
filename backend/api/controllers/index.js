<<<<<<< HEAD
import { default as user } from "./user.controller.js";
import { default as logbook } from "./logbook.controller.js";
import { default as school } from "./school.controller.js";

export default {
  User: user,
  Logbook: logbook,
  School: school,
=======
import { default as admin } from './admin.controller.js';
import { default as school } from './school.controller.js';
import { default as auth } from './auth.js';

export default {
    School: school,
    Auth: auth,
    Admin: admin,
>>>>>>> 389c7cd0faca020fa9ccf63e2cc6c3764f549c74
};
