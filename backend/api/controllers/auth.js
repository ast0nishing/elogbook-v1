import argon2 from 'argon2';
import { default as jwt } from 'jsonwebtoken';
import config from '../config/auth.config.js';
import { default as db } from '../models/index.js';

export default {
    async adminLogin(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).json({ msg: 'invalid login' });
        }

        const user = await db.admin.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ msg: 'username does not exist' });
        }

        if (await argon2.verify(user.password, password)) {
            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400, // 24 hours
            });
            return res.status(200).send({
                id: user.id,
                username: user.username,
                accessToken: token,
            });
        }

        return res.status(401).json({ msg: 'wrong password' });
    },
    async schoolLogin(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).json({ msg: 'invalid login' });
        }

        const user = await db.school.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ msg: 'username does not exist' });
        }

        if (await argon2.verify(user.password, password)) {
            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400, // 24 hours
            });
            return res.status(200).send({
                id: user.id,
                username: user.username,
                accessToken: token,
            });
        }

        return res.status(401).json({ msg: 'wrong password' });
    },
    async teacherLogin(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).json({ msg: 'invalid login' });
        }

        const user = await db.teacher.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ msg: 'username does not exist' });
        }

        if (await argon2.verify(user.password, password)) {
            const token = jwt.sign(
                { id: user.id, schoolId: user.schoolId },
                config.secret,
                {
                    expiresIn: 86400, // 24 hours
                }
            );
            return res.status(200).send({
                id: user.id,
                schoolId: user.schoolId,
                username: user.username,
                accessToken: token,
            });
        }

        return res.status(401).json({ msg: 'wrong password' });
    },
    async studentLogin(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).json({ msg: 'invalid login' });
        }

        const user = await db.student.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ msg: 'username does not exist' });
        }

        if (await argon2.verify(user.password, password)) {
            const token = jwt.sign(
                { id: user.id, schoolId: user.schoolId },
                config.secret,
                {
                    expiresIn: 86400, // 24 hours
                }
            );
            return res.status(200).send({
                id: user.id,
                schoolId: user.schoolId,
                username: user.username,
                accessToken: token,
            });
        }
        return res.status(401).json({ msg: 'wrong password' });
    },
};
