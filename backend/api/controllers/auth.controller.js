import config from '../config/auth.config.js';
import { default as db } from '../models/index.js';
import { default as jwt } from 'jsonwebtoken';

const Moderator = db.school;
const Teacher = db.teacher;
const Student = db.student;

const signInAtModerator = (req, res) => {
    Moderator.findOne({
        where: { username: req.body.username },
    }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: 'User Not found.' });
        }
        const passwordIsValid =
            req.body.password === user.password ? true : false;
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid Password!',
            });
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
        });
        res.status(200).send({
            id: user._id,
            username: user.username,
            roles: user.roles,
            accessToken: token,
        });
    });
};
const signInAtTeacher = (req, res) => {
    Teacher.findOne({
        where: { username: req.body.username },
    }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: 'User Not found.' });
        }
        const passwordIsValid =
            req.body.password === user.password ? true : false;
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid Password!',
            });
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // expires in 24 hours
        });
        res.status(200).send({
            id: user._id,
            username: user.username,
            roles: user.roles,
            accessToken: token,
        });
    });
};
const signInAtStudent = (req, res) => {
    Student.findOne({
        where: { username: req.body.username },
    }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: 'User Not found.' });
        }
        const passwordIsValid =
            req.body.password === user.password ? true : false;
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid Password!',
            });
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
        });
        res.status(200).send({
            id: user._id,
            username: user.username,
            roles: user.roles,
            accessToken: token,
        });
    });
};
export { signInAtModerator, signInAtTeacher, signInAtStudent };
