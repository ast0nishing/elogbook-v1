import httpStatus from 'http-status';
import { default as db } from '../models/index.js';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
// import timetable from '../models/bulkcreate/timetable.js';
import jwt from 'jsonwebtoken';
import { default as config } from '../configs/authConfig.js';
import { EDESTADDRREQ } from 'constants';

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
    async updatePassword(req, res) {
        const teacherDataToChangePassword = await db.teacher.findOne({
            where: { id: req.user.id },
        });
        if (
            await argon2.verify(
                teacherDataToChangePassword.dataValues.password,
                req.body.oldPassword
            )
        ) {
            const salt = randomBytes(32);
            const hashedPassword = await argon2.hash(req.body.newPassword, {
                salt,
            });

            await db.teacher
                .update(
                    {
                        password: hashedPassword,
                    },
                    {
                        where: { id: req.user.id },
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
    async timetableByWeekAndClass(req, res) {
        const timetableData = await db.timetable.findAll({
            where: { classId: req.params.classId },
        });
        const days = {
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday',
            7: 'Sunday',
        };
        const weekInRange = [];
        for (let data of timetableData) {
            if (
                data.dataValues.fromWeek <= req.params.week &&
                (data.dataValues.toWeek === -1 ||
                    data.dataValues.toWeek >= req.params.week)
            ) {
                const teacherData = await db.teacher.findOne({
                    where: { id: data.dataValues.teacherId },
                });
                const classData = await db.class.findOne({
                    where: { id: data.dataValues.classId },
                });
                data.dataValues.teacherName = teacherData.dataValues.name;
                data.dataValues.className = classData.dataValues.name;
                data.dataValues.day = days[data.dataValues.weekDay];
                delete data.dataValues.id;
                delete data.dataValues.fromWeek;
                delete data.dataValues.toWeek;
                delete data.dataValues.weekDay;
                weekInRange.push(data.dataValues);
            }
        }
        res.send(weekInRange);
    },
    async getLogbookById(req, res) {
        const logbookData = await db.logbook.findOne({
            where: { id: req.params.logbookId },
        });
        res.send(logbookData.dataValues);
    },
    async updateLogbook(req, res) {
        const success = await db.logbook.update(
            {
                grade: req.body.grade,
                comment: req.body.comment,
                note: req.body.note,
            },
            { where: { id: req.params.logbookId } }
        );
        console.log(success);
        if (success[0] === 1)
            res.json({ message: 'updates logbook successfully' });
        else res.json({ message: 'edit failed' });
    },
    async getSelf(req, res) {
        const data = await db.teacher.findOne({ where: { id: req.user.id } });
        delete data.dataValues.password;
        delete data.dataValues.securitySecret;
        delete data.dataValues.id;
        res.send(data.dataValues);
    },
    async editSelf(req, res) {
        const data = await db.teacher.update(
            {
                name: req.body.name,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                dob: req.body.dob,
            },
            { where: { id: req.user.id } }
        );
        if (data[0] === 1)
            res.json({ message: 'updates profile successfully' });
        else res.json({ message: 'edit failed' });
    },
};
