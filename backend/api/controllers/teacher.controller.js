import httpStatus from 'http-status';
import { default as db } from '../models/index.js';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import timetable from '../models/bulkcreate/timetable.js';
import jwt from 'jsonwebtoken';
import { default as config } from '../config/auth.config.js';

export default {
    async findAllTeachersByClassAndYear(req, res) {
        const token = req.headers['x-access-token'];
        jwt.verify(token, config.secret, (err, decoded) => {
            req.userId = decoded.id;
            req.schoolId = decoded.schoolId;
        });
        const classData = await db.class.findOne({
            where: {
                name: req.params.className,
                academicYearId: req.params.year,
                schoolId: req.schoolId,
            },
        });
        if (!classData) {
            return res.json({ message: 'class not found!' });
        }
        const teacherId = [];
        const allTeacherData = await db.teacher.findAll();
        for (const teacherData of allTeacherData) {
            const timetableData = await db.timetable.findOne({
                where: {
                    teacherId: teacherData.dataValues.id,
                    classId: classData.dataValues.id,
                },
            });
            if (timetableData) {
                teacherId.push({
                    id: timetableData.dataValues.teacherId,
                    name: teacherData.dataValues.name,
                });
            }
        }
        res.json(teacherId);
    },
    async findAllTeachers(req, res) {
        const token = req.headers['x-access-token'];
        jwt.verify(token, config.secret, (err, decoded) => {
            req.userId = decoded.id;
            req.schoolId = decoded.schoolId;
        });
        const teacherId = [];
        const allTeacherData = await db.teacher.findAll({
            where: { schoolId: req.schoolId },
        });
        for (const teacherData of allTeacherData) {
            teacherId.push({
                id: teacherData.dataValues.id,
                name: teacherData.dataValues.name,
            });
        }
        res.json(teacherId);
    },
};
