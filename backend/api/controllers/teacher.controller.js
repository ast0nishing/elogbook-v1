import httpStatus from 'http-status';
import { default as db } from '../models/index.js';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
// import timetable from '../models/bulkcreate/timetable.js';
import jwt from 'jsonwebtoken';
import { default as config } from '../configs/authConfig.js';
import { EDESTADDRREQ } from 'constants';
import { timeStamp } from 'console';

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
                    teacherId: teacherData.idSchool,
                    teacherName: teacherData.name,
                    major: teacherData.major,
                    phone: teacherData.phone,
                    email: teacherData.email,
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
        const studentData = await db.student.findOne({
            where: { idSchool: req.params.studentId },
        });
        if (!studentData) {
            return res.status(400).json({ message: 'data not found!' });
        }
        const studentData2 = await db.student.findAll({
            include: [{ model: db.class, though: 'class_student' }],
            where: { id: studentData.dataValues.id },
        });
        // console.log(studentData2);
        // return res.json({});
        if (!studentData2 || studentData2.length === 0) {
            return res.status(400).json({ message: 'data not found!' });
        }
        const fullData = [];
        try {
            for (const data of studentData2) {
                const studentClassId =
                    data.dataValues.classes.pop().dataValues.id;
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
                delete studentData.dataValues.id;
                delete studentData.dataValues.schoolId;
                delete studentData.dataValues.securitySecret;
                studentData.dataValues.className = classData.dataValues.name;
                studentData.dataValues.academicYear = `${
                    classData.dataValues.academicYearId
                }-${parseInt(classData.dataValues.academicYearId) + 1}`;
                studentData.dataValues.headTeacherName =
                    teacherData.dataValues.name;
                fullData.push(studentData);
            }
            res.send(fullData);
        } catch (err) {
            res.json({ error: 'error occured' });
        }
    },
    async findClass(req, res) {
        const classData2 = await db.class.findOne({
            where: { idSchool: req.params.classId },
        });
        if (!classData2) {
            return res.status(400).json({ message: 'data not found!' });
        }
        const classData = await db.class.findOne({
            include: [{ model: db.student, though: 'class_student' }],
            where: { id: classData2.dataValues.id },
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
        delete classData.dataValues.teacherId;
        delete classData.dataValues.id;
        delete classData.dataValues.academicYearId;
        for (const data of classData.dataValues.students) {
            delete data.dataValues.password;
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
        const classData = await db.class.findOne({
            where: { idSchool: req.params.classId },
        });
        const timetableData = await db.timetable.findAll({
            where: { classId: classData.dataValues.id },
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
                const courseData = await db.course.findOne({
                    where: { code: data.dataValues.courseCode },
                });
                data.dataValues.courseName = courseData.dataValues.name;
                data.dataValues.teacherName = teacherData.dataValues.name;
                data.dataValues.teacherId = teacherData.dataValues.idSchool;
                data.dataValues.className = classData.dataValues.name;
                data.dataValues.day = days[data.dataValues.weekDay];
                delete data.dataValues.id;
                delete data.dataValues.fromWeek;
                delete data.dataValues.toWeek;
                delete data.dataValues.weekDay;
                delete data.dataValues.classId;
                weekInRange.push(data.dataValues);
            }
        }
        res.send(weekInRange);
    },
    async timetablesByYearAndWeek(req, res) {
        const classDataOfYear = await db.class.findAll({
            where: { academicYearId: req.params.year },
        });
        const timetableData = [];
        let weekInRange = [];
        for (const classData of classDataOfYear) {
            const temp = await db.timetable.findAll({
                where: { classId: classData.dataValues.id },
            });
            timetableData.push(temp);
            weekInRange.push({
                className: classData.dataValues.name,
                classId: classData.dataValues.idSchool,
                week: req.params.week,
                timetable: [],
            });
        }
        // const timetableData = await db.timetable.findAll({
        //     where: { classId: req.params.classId },
        // });
        const days = {
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday',
            7: 'Sunday',
        };
        let i = 0;
        for (let data of timetableData) {
            for (let subdata of data) {
                if (
                    subdata.dataValues.fromWeek <= req.params.week &&
                    (subdata.dataValues.toWeek === -1 ||
                        subdata.dataValues.toWeek >= req.params.week)
                ) {
                    const teacherData = await db.teacher.findOne({
                        where: { id: subdata.dataValues.teacherId },
                    });
                    if (teacherData) {
                        subdata.dataValues.teacherName =
                            teacherData.dataValues.name;
                        subdata.dataValues.teacherId =
                            teacherData.dataValues.idSchool;
                    } else {
                        subdata.dataValues.teacherName = null;
                        subdata.dataValues.teacherId = null;
                    }
                    subdata.dataValues.day = days[subdata.dataValues.weekDay];
                    const courseData = await db.course.findOne({
                        where: { code: subdata.dataValues.courseCode },
                    });
                    subdata.dataValues.courseName = courseData.dataValues.name;
                    // delete subdata.dataValues.id;
                    delete subdata.dataValues.fromWeek;
                    delete subdata.dataValues.toWeek;
                    delete subdata.dataValues.weekDay;
                    delete subdata.dataValues.id;
                    delete subdata.dataValues.classId;
                    weekInRange[i].timetable.push(subdata.dataValues);
                }
            }
            i++;
        }
        res.send(weekInRange);
    },
    async getLogbookById(req, res) {
        const logbookData = await db.logbook.findOne({
            where: { id: req.params.logbookId },
        });
        if (!logbookData) {
            return res.status(400).send('data not found');
        }
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
    async getTimetable(req, res) {
        const data = await db.timetable.findAll({
            where: {
                teacherId: req.user.id,
            },
        });
        if (!data) {
            return res.status(400).json({ message: 'data not found' });
        }
        const fullData = [];
        const days = {
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday',
            7: 'Sunday',
        };
        if (req.params.week == -1) {
            for (const temp of data) {
                const classData = await db.class.findOne({
                    where: { id: temp.dataValues.classId },
                });
                if (!classData) {
                    return res.status(400).json({ message: 'data not found' });
                }
                if (
                    temp.dataValues.toWeek == -1 &&
                    classData.dataValues.academicYearId == req.params.year
                ) {
                    temp.dataValues.day = days[temp.dataValues.weekDay];
                    const courseData = await db.course.findOne({
                        where: { code: temp.dataValues.courseCode },
                    });
                    temp.dataValues.courseName = courseData.dataValues.name;
                    // delete temp.dataValues.fromWeek;
                    delete temp.dataValues.weekDay;
                    // delete temp.dataValues.toWeek;
                    delete temp.dataValues.classId;
                    delete temp.dataValues.teacherId;
                    delete temp.dataValues.id;
                    temp.dataValues.classId = classData.dataValues.idSchool;
                    temp.dataValues.className = classData.dataValues.name;
                    fullData.push(temp.dataValues);
                }
            }
        } else {
            for (const temp of data) {
                const classData = await db.class.findOne({
                    where: { id: temp.dataValues.classId },
                });
                if (!data) {
                    return res.status(400).json({ message: 'data not found' });
                }
                if (
                    temp.dataValues.fromWeek <= req.params.week &&
                    (temp.dataValues.toWeek >= req.params.week ||
                        temp.dataValues.toWeek == -1) &&
                    classData.dataValues.academicYearId == req.params.year
                ) {
                    temp.dataValues.day = days[temp.dataValues.weekDay];
                    const courseData = await db.course.findOne({
                        where: { code: temp.dataValues.courseCode },
                    });
                    temp.dataValues.courseName = courseData.dataValues.name;
                    delete temp.dataValues.weekDay;
                    delete temp.dataValues.classId;
                    delete temp.dataValues.teacherId;
                    delete temp.dataValues.id;
                    temp.dataValues.classId = classData.dataValues.idSchool;
                    temp.dataValues.className = classData.dataValues.name;
                    fullData.push(temp.dataValues);
                }
            }
        }
        res.send(fullData);
    },
    async rankingByGrade(req, res) {
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
            if (classData.dataValues.name[0] != req.params.grade) continue;
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
                classId: classData.dataValues.idSchool,
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
    async editStudent(req, res) {
        const studentData = await db.student.findOne({
            where: { idSchool: req.params.studentId },
        });
        if (!studentData) {
            return res.status(400).json({
                message: 'student not found',
            });
        }

        if (req.user.schoolId === studentData.dataValues.schoolId) {
            const studentData2 = await db.student.findAll({
                include: [{ model: db.class, though: 'class_student' }],
                where: { id: studentData.dataValues.id },
            });
            const classData = await db.class.findAll({
                where: { teacherId: req.user.id },
            });
            const myClasses = [];
            for (const data of classData) {
                myClasses.push(data.dataValues.id);
            }
            if (studentData2[0]['classes'].length < 1)
                return res
                    .status(400)
                    .json({ message: 'student does not belong to any class' });
            for (const data of studentData2[0]['classes']) {
                if (data.dataValues.id == myClasses.pop()) {
                    const data = await db.student.update(
                        {
                            name: req.body.name,
                            address: req.body.address,
                            phoneNumber: req.body.phoneNumber,
                            email: req.body.email,
                            dob: req.body.dob,
                        },
                        { where: { idSchool: req.params.studentId } }
                    );
                    if (data[0] === 1)
                        return res.json({
                            message: 'update student successfully',
                        });
                    else return res.json({ message: 'update failed' });
                }
            }
            return res
                .status(400)
                .json({ message: 'student does not belong to your class' });
        } else {
            res.status(400).json({
                message: 'student does not belong to your school',
            });
        }
    },
};
