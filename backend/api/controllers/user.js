import db from '../models/index.js';
// import pkg from 'sequelize';
// const { Op } = pkg;
import bcrypt from 'bcrypt';

export default {
    async create(req, res) {
        const users = {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        };
        await db.users
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
    async findAll(req, res) {
        await db.users
            .findAll()
            .then((data) => {
                res.send(data);
                console.log(data);
            })
            .catch((err) => {
                res.status(500);
            });
    },
    async findOne(req, res) {
        await db.users
            .findOne({
                where: { username: req.params.username },
            })
            .then((data) => {
                if (data) res.send(data);
                res.send('user not found!');
            })
            .catch((err) => {
                res.status(500);
            });
    },
    async update(req, res) {
        await db.users
            .update(
                { password: req.body.password },
                { where: { username: req.params.username } }
            )
            .then((status) => {
                if (status === 1) res.send('updated password');
                else res.status(400).send('update password fail');
            })
            .catch((err) => {
                res.status(500);
            });
    },
    async delete(req, res) {
        await db.users
            .destroy({ where: { username: req.params.username } })
            .then((status) => {
                if (status === 1) res.send('deleted user');
                else
                    res.status(400).send(
                        'something happen while deleting user'
                    );
            })
            .catch((err) => {
                res.status(500);
            });
    },
};
