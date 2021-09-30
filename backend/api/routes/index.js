import { router as userRoute } from './user.route.js';
import { router as schoolRoute } from './school.route.js';
import { router as logbookRoute } from './logbook.route.js';

export default (app) => {
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/schools', schoolRoute);
    app.use('/api/v1/logbooks', logbookRoute);
};
