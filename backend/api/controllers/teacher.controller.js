import httpStatus from 'http-status';
import { default as db } from '../models/index.js';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
// import timetable from '../models/bulkcreate/timetable.js';
import jwt from 'jsonwebtoken';
import { default as config } from '../configs/authConfig.js';

export default {
    async findAllTeachersByClassAndYear(req, res) {
        console.log('asd');
        const classData = await db.class.findOne({
            where: {
                name: req.params.className,
                academicYearId: req.params.year,
                schoolId: req.user.schoolId,
            },
        });
        if (!classData) {
            return res.status(400).json({ message: 'class not found!' });
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
        if (!allTeacherData || allTeacherData.length === 0) {
            return res.status(400).json({ message: 'data not found!' });
        }
        for (const teacherData of allTeacherData) {
            teacherId.push({
                id: teacherData.dataValues.id,
                name: teacherData.dataValues.name,
            });
        }
        res.json(teacherId);
    },
    async findStudent(req, res) {
        const studentData2 = await db.student.findAll({
            include: [{ model: db.class, though: 'class_student' }],
            where: { id: req.params.studentId },
        });
        // console.log(studentData2);
        // return res.json({});
        if (!studentData2 || studentData2.length === 0) {
            return res.status(400).json({ message: 'data not found!' });
        }
        const fullData = [];
        for (const data of studentData2) {
            const studentClassId = data.dataValues.classes.pop().dataValues.id;
            const studentData = await db.student.findOne({
                where: { id: req.params.studentId },
            });
            const classData = await db.class.findOne({
                include: [{ model: db.student, though: 'class_student' }],
                where: { id: studentClassId },
            });
            const teacherData = await db.teacher.findOne({
                where: { id: classData.dataValues.teacherId },
            });
            const schoolData = await db.school.findOne({
                where: { id: classData.dataValues.schoolId },
            });
            studentData.dataValues.schoolName = schoolData.dataValues.name;
            delete studentData.dataValues.password;
            delete studentData.dataValues.schoolId;
            delete studentData.dataValues.id;
            delete studentData.dataValues.idSchool;
            studentData.dataValues.className = classData.dataValues.name;
            studentData.dataValues.academicYear = `${
                classData.dataValues.academicYearId
            }-${parseInt(classData.dataValues.academicYearId) + 1}`;
            studentData.dataValues.headTeacherName =
                teacherData.dataValues.name;
            fullData.push(studentData);
            console.log('done');
        }
        res.send(fullData);
    },
    async findClass(req, res) {
        const classData = await db.class.findOne({
            include: [{ model: db.student, though: 'class_student' }],
            where: { id: req.params.classId },
        });
        if (!classData || classData.length === 0) {
            return res.status(400).json({ message: 'data not found!' });
        }
        const schoolData = await db.school.findOne({
            where: { id: classData.dataValues.schoolId },
        });
        const teacherData = await db.teacher.findOne({
            where: { id: classData.dataValues.teacherId },
        });
        classData.dataValues.schoolName = schoolData.dataValues.name;
        classData.dataValues.headTeacherName = teacherData.dataValues.name;
        classData.dataValues.academicYear = `${
            classData.dataValues.academicYearId
        }-${parseInt(classData.dataValues.academicYearId) + 1}`;
        delete classData.dataValues.schoolId;
        delete classData.dataValues.idSchool;
        delete classData.dataValues.teacherId;
        delete classData.dataValues.id;
        delete classData.dataValues.academicYearId;
        for (const data of classData.dataValues.students) {
            delete data.dataValues.password;
            delete data.dataValues.idSchool;
            delete data.dataValues.class_student;
            delete data.dataValues.schoolId;
        }
        res.send(classData);
    },
};
