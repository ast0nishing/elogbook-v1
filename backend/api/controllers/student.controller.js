import { default as db } from '../models/index.js';
import jwt from 'jsonwebtoken';
import { default as config } from '../configs/authConfig.js';
import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import { time } from 'console';

export default {
    async editSelf(req, res) {
        const data = await db.student.update(
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
        const studentProfile = await db.student.findOne({
            where: { id: req.user.id },
        });
        const fullData = {
            username: studentProfile.dataValues.username,
            role: studentProfile.dataValues.role,
            studentName: studentData.dataValues.name,
            email: studentProfile.dataValues.email,
            address: studentProfile.dataValues.address,
            phoneNumber: studentProfile.dataValues.phoneNumber,
            dob: studentProfile.dataValues.dob,
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
    async timetableByWeek(req, res) {
        // const classData = await db.class.findOne({
        //     where: { studentId: req.user.id },
        //     order: [['createdAt', 'DESC']],
        // });
        const studentData2 = await db.student.findOne({
            include: [{ model: db.class, though: 'class_student' }],
            where: { id: req.user.id },
        });
        const timetableData = await db.timetable.findAll({
            where: {
                classId: studentData2.dataValues.classes.pop().dataValues.id,
            },
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

    async updatePassword(req, res) {
        const studentData = await db.student.findOne({
            where: { id: req.user.id },
        });
        console.log(studentData.dataValues);
        // return;
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
};
