import { router as userRoute } from './user.route.js';
import { router as schoolRoute } from './school.route.js';
import { router as logbookRoute } from './logbook.route.js';
import { router as authRoute } from './auth.route.js';

export default (app) => {
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/schools', schoolRoute);
    app.use('/api/v1/logbooks', logbookRoute);
    app.use('/api/v1/auth', authRoute);
};
