import jwt from 'jsonwebtoken';
import { default as config } from '../config/auth.config.js';
import db from '../models/index.js';

// const Admin = db.admin;
const Moderator = db.school;
const Teacher = db.teacher;
const Student = db.student;

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        next();
    });
};

// const isAdmin = (req, res, next) => {
//     Admin.findById(req.userId).exec((err, user) => {
//         if (err) {
//             res.status(500).send({ message: err });
//             return;
//         }
//     });
// };

const isModerator = (req, res, next) => {
    Moderator.findOne({
        where: { id: req.userId },
    }).then((user) => {
        if (!user) {
            return res.status(500).send({ message: 'User Not found.' });
        }
        next();
    });
};
const isTeacher = (req, res, next) => {
    Teacher.findOne({
        where: { id: req.userId },
    }).then((user) => {
        if (!user) {
            return res.status(500).send({ message: 'User Not found.' });
        }
        next();
    });
};
const isStudent = (req, res, next) => {
    Student.findOne({
        where: { username: req.body.username },
    }).then((user) => {
        if (!user) {
            return res.status(500).send({ message: 'User Not found.' });
        }
        next();
    });
};
const authJwt = {
    verifyToken,
    isModerator,
    isTeacher,
    isStudent,
};
export default authJwt;
