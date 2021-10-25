<<<<<<< HEAD
import db from "../models/index.js";

export default {
  async create(req, res) {},
  async findAll(req, res) {},
  async findOne(req, res) {},
  async update(req, res) {},
  async delete(req, res) {},
=======
// import db from "../models/index.js";
import { default as db } from '../models/index.js';
import httpStatus from 'http-status';

export default {
    async create(req, res) {
        const teacher = await db.teacher.findOne({
            where: { id: req.userId },
        });

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
    async findAll(req, res) {},
    async findOne(req, res) {},
    async update(req, res) {},
    async delete(req, res) {},
>>>>>>> 389c7cd0faca020fa9ccf63e2cc6c3764f549c74
};
