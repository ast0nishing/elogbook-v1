import { default as db } from '../models/index.js';
import jwt from 'jsonwebtoken';
import { default as config } from '../configs/authConfig.js';
import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import { time } from 'console';

export default {
    // async findAllStudents(req, res) {
    //     const token = req.headers['x-access-token'];
    //     jwt.verify(token, config.secret, (err, decoded) => {
    //         req.userId = decoded.id;
    //         req.schoolId = decoded.schoolId;
    //     });
    //     const allStudentData = await db.student.findAll({
    //         where: { schoolId: req.schoolId },
    //     });
    //     for (const studentData of allStudentData) {
    //         delete studentData.dataValues.password;
    //         delete studentData.dataValues.schoolId;
    //     }
    //     res.send(allStudentData);
    // },
    // find student given studentId
    async findStudent(req, res) {
        const studentData = await db.student.findOne({
            include: [{ model: db.class, though: 'class_student' }],
            where: { id: req.user.id },
        });
        if (studentData.dataValues.classes.length === 0) {
            return res.json({
                message: 'Student does not belong to any class',
            });
        }
        const studentClassId =
            studentData.dataValues.classes.pop().dataValues.id;
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
        const studentNames = [];
        for (const student of classData.dataValues.students) {
            studentNames.push({
                id: student.dataValues.id,
                name: student.dataValues.name,
            });
        }
        const fullData = {
            studentName: studentData.dataValues.name,
            schoolId: schoolData.dataValues.idSchool,
            schoolName: schoolData.dataValues.name,
            className: classData.dataValues.name,
            teacherName: teacherData.dataValues.name,
        };
        res.json(fullData);
    },
    async rankingByWeek(req, res) {
        const allClassData = await db.class.findAll({
            where: {
                schoolId: req.user.schoolId,
                academicYearId: req.params.year,
            },
        });
        if (!allClassData || allClassData.length === 0) {
            return res.status(400).json({ message: 'data not found!' });
        }
        const fullData = [];
        for (const classData of allClassData) {
            const allTimetableData = await db.timetable.findAll({
                where: { classId: classData.dataValues.id },
            });

            let totalPoint = 0;
            for (const timetableData of allTimetableData) {
                const allLogbookData = await db.logbook.findAll({
                    where: {
                        week: req.params.week,
                        timetableId: timetableData.dataValues.id,
                    },
                });
                if (!allLogbookData || allLogbookData.length === 0) {
                    continue;
                }
                for (const logbookData of allLogbookData) {
                    totalPoint += logbookData.dataValues.grade;
                }
            }
            const headTeacherData = await db.teacher.findOne({
                where: { id: classData.dataValues.teacherId },
            });
            let headTeacherName = headTeacherData
                ? headTeacherData.dataValues.name
                : 'not found!';

            fullData.push({
                className: classData.dataValues.name,
                academicYear: `${classData.dataValues.academicYearId}-${
                    parseInt(classData.dataValues.academicYearId) + 1
                }`,
                headTeacherName: headTeacherName,
                week: req.params.week,
                grade: totalPoint,
            });
        }
        if (fullData.length === 0) {
            res.status(400).json({ message: 'data not found!' });
        } else {
            res.json(fullData);
        }
    },
    async rankingByYear(req, res) {
        const allClassData = await db.class.findAll({
            where: {
                schoolId: req.user.schoolId,
                academicYearId: req.params.year,
            },
        });
        if (!allClassData || allClassData.length === 0) {
            return res.status(400).json({ message: 'data not found!' });
        }
        const fullData = [];
        for (const classData of allClassData) {
            const allTimetableData = await db.timetable.findAll({
                where: { classId: classData.dataValues.id },
            });

            let totalPoint = 0;
            for (const timetableData of allTimetableData) {
                const allLogbookData = await db.logbook.findAll({
                    where: {
                        timetableId: timetableData.dataValues.id,
                    },
                });
                for (const logbookData of allLogbookData) {
                    totalPoint += logbookData.dataValues.grade;
                }
            }
            const headTeacherData = await db.teacher.findOne({
                where: { id: classData.dataValues.teacherId },
            });
            let headTeacherName = headTeacherData
                ? headTeacherData.dataValues.name
                : 'not found!';
            fullData.push({
                className: classData.dataValues.name,
                academicYear: `${classData.dataValues.academicYearId}-${
                    parseInt(classData.dataValues.academicYearId) + 1
                }`,
                headTeacherName: headTeacherName,
                week: req.params.week,
                grade: totalPoint,
            });
        }

        res.json(fullData);
    },
    async updatePassword(req, res) {
        const token = req.headers['x-access-token'];
        jwt.verify(token, config.secret, (err, decoded) => {
            req.userId = decoded.id;
            req.schoolId = decoded.schoolId;
        });

        const studentData = await db.student.findOne({
            where: { id: req.userId },
        });
        if (
            await argon2.verify(
                studentData.dataValues.password,
                req.body.oldPassword
            )
        ) {
            const salt = randomBytes(32);
            const hashedPassword = await argon2.hash(req.body.newPassword, {
                salt,
            });
            await db.student
                .update(
                    {
                        password: hashedPassword,
                    },
                    {
                        where: { id: req.userId },
                    }
                )
                .then((data) => {
                    res.json({ message: 'updated password' });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            res.status(400).json({ message: 'password does not match' });
        }
    },
};
