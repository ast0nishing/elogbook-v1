import jwt from 'jsonwebtoken';
import { default as config } from '../config/auth.config.js';
import { default as db } from '../models/index.js';
import httpStatus from 'http-status';

const School = db.school;
const Teacher = db.teacher;
const Student = db.student;
const Admin = db.admin;

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

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
    } catch (err) {
        console.log(err);
    }
};

const isAdmin = (req, res, next) => {
    Admin.findOne({
        where: { id: req.userId },
    }).then((user) => {
        if (!user) {
            return res.status(500).send({ message: 'User Not found.' });
        }
        next();
    });
};

const isSchool = (req, res, next) => {
    School.findOne({
        where: { id: req.userId },
    }).then((user) => {
        if (!user) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json({ msg: 'do not have authority' });
        }
        next();
    });
};
const isTeacher = (req, res, next) => {
    Teacher.findOne({
        where: { id: req.userId },
    }).then((user) => {
        if (!user) {
            return res.status(500).send({ message: 'Only for Teacher.' });
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
    isSchool,
    isTeacher,
    isStudent,
    isAdmin,
};
export default authJwt;
