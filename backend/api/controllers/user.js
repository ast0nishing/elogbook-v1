import db from '../models/index.js';

export default {
    create(req, res) {
        console.log('creating...');
        if (!req.body.username) {
            res.status(400).send({
                message: 'username can not be empty',
            });
            return;
        }
        const users = {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        };
        db.users
            .create(users)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        'some error occurred while creating a user',
                });
            });
    },
};
