import app from './api/server.js';
import db from './api/models/index.js';

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
