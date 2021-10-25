// import db from "../models/index.js";
import { default as db } from '../models/index.js';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { default as config } from '../config/auth.config.js';

export default {
    async create(req, res) {
        console.log('asd');
        const teacher = await db.teacher.findOne({
            where: { id: req.userId },
        });
        console.log(teacher);
        if (teacher == null) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json({ msg: 'do not have authority' });
        }
        console.log(teacher);

        const alreadyExist = [];
        const missingInfo = [];
        const invalidId = [];
        const logbooks = req.body;
        // const schoolCheck = [school.idSchool, "-"].join("");

        try {
            for (const logbook of logbooks) {
                if (
                    !logbook.grade ||
                    !logbook.comment ||
                    !logbook.lessonId ||
                    !logbook.timetableId ||
                    !logbook.week
                ) {
                    missingInfo.push(logbook);
                    continue;
                }
                const validTimeTable = await db.timetable.findOne({
                    where: { id: logbook.timetableId, teacherId: teacher.id },
                });
                if (!validTimeTable) {
                    console.log(
                        `Time table ID ${logbook.timetableId} do not exist --> cannot create logbook`
                    );
                    invalidId.push(logbook.timetableId);
                    continue;
                }
                const logbookExist = await db.logbook.findOne({
                    where: {
                        week: logbook.week,
                        timetableId: logbook.timetableId,
                    },
                });
                if (logbookExist) {
                    console.log(
                        `LOGBOOK ALREADY EXIST --> USE MODIFY FUNCTION INSTEAD`
                    );
                    alreadyExist.push(logbookExist);
                    continue;
                }
                await db.logbook.create(logbook);
            }
            if (
                missingInfo.length === 0 &&
                invalidId.length === 0 &&
                alreadyExist.length === 0
            ) {
                return res
                    .status(httpStatus.OK)
                    .json({ msg: 'Create all logbook success' });
            }

            return res.status(httpStatus.OK).json({
                'Already Exist logbook': alreadyExist,
                'Missing primary info': missingInfo,
                'Invalid Time table ID': invalidId,
            });
        } catch (err) {
            console.log(err);
        }
    },

    //
    async findAll(req, res) {
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
            });
        } catch (err) {
            console.log(err);
        }
        let timetableData = await db.timetable.findAll({
            where: { teacherId: req.userId },
        });
        const fullData = [];
        for (const data of timetableData) {
            const logbookData = await db.logbook.findOne({
                where: { timetableId: data.dataValues.id },
            });
            const lessonData = await db.lesson.findOne({
                where: { id: logbookData.dataValues.lessonId },
            });
            const courseData = await db.course.findOne({
                where: { code: data.dataValues.courseCode },
            });
            const teacherData = await db.teacher.findOne({
                where: { id: data.dataValues.teacherId },
            });
            const classData = await db.class.findOne({
                where: { id: data.dataValues.classId },
            });
            const days = [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ];
            console.log(logbookData.dataValues.week);
            fullData.push({
                className: classData.dataValues.name,
                week: logbookData.dataValues.week,
                day: days[data.dataValues.weekDay],
                time: data.dataValues.time,
                grade: logbookData.dataValues.grade,
                comment: logbookData.dataValues.comment,
                note: logbookData.dataValues.note,
                courseName: courseData.dataValues.name,
                lessonName: lessonData.dataValues.name,
                teacherName: teacherData.dataValues.name,
            });
            // fullData.push([data.dataValues.teacherId, data.dataValues.fromWeek, data.dataValues.toWeek, ])
            // console.log(data.dataValues.teacherId);
        }
        res.json(fullData);
    },

    async findOne(req, res) {
        const classData = await db.class.findOne({
            where: { name: req.params.className },
        });
        const timetableData = await db.timetable.findOne({
            where: { classId: classData.dataValues.id },
        });
        const logbookData = await db.logbook.findOne({
            where: { timetableId: timetableData.dataValues.id },
        });
        console.log(timetableData.dataValues.id);
        res.send(logbookData.dataValues);
    },
    async update(req, res) {},
    async delete(req, res) {},
};
