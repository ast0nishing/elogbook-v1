import { default as admin } from './admin.controller.js';
import { default as school } from './school.controller.js';
import { default as logbook } from './logbook.controller.js';
import { default as auth } from './auth.js';

export default {
    Auth: auth,
    Admin: admin,
    School: school,
    Logbook: logbook,
};
