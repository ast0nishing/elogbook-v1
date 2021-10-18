import app from './api/server.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
