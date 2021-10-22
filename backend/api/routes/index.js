import { router as schoolRoute } from './school.route.js';
import { router as admin } from './admin.route.js';
import { router as serviceLogin } from './login.js';

export default (app) => {
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.use('/api/v1/schools', schoolRoute);

    app.use('/admin', admin);
    app.use('/login', serviceLogin);
};
