// import db from "../models/index.js";
import { default as db } from "../models/index.js";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { default as config } from "../configs/authConfig.js";

export default {
  async create(req, res) {
    console.log(req.user);
    const teacher = await db.teacher.findOne({
      where: { id: req.user.id },
    });

    const alreadyExist = [];
    const missingInfo = [];
    const invalidId = [];
    const logbooks = req.body;

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
          console.log(`LOGBOOK ALREADY EXIST --> USE MODIFY FUNCTION INSTEAD`);
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
          .json({ msg: "Create all logbook success" });
      }

      return res.status(httpStatus.OK).json({
        "Already Exist logbook": alreadyExist,
        "Missing primary info": missingInfo,
        "Invalid Time table ID": invalidId,
      });
    } catch (err) {
      console.log(err);
    }
  },

  //
  // async findAll(req, res) {
  //   const days = {
  //     1: "Monday",
  //     2: "Tuesday",
  //     3: "Wednesday",
  //     4: "Thursday",
  //     5: "Friday",
  //     6: "Saturday",
  //     7: "Sunday",
  //   };
  //   const token = req.headers["x-access-token"];
  //   jwt.verify(token, config.secret, (err, decoded) => {
  //     req.userId = decoded.id;
  //   });
  //   const allClassData = await db.class.findAll({
  //     where: {
  //       academicYearId: req.params.year,
  //     },
  //   });
  //   if (!allClassData || allClassData.length === 0) {
  //     return res.status(400).json({ message: "data not found!" });
  //   }
  //   const fullData = [];
  //   for (const classData of allClassData) {
  //     const timetableData = await db.timetable.findAll({
  //       where: {
  //         teacherId: req.userId,
  //         classId: classData.dataValues.id,
  //       },
  //     });
  //     for (const data of timetableData) {
  //       const logbookData = await db.logbook.findOne({
  //         where: { timetableId: data.dataValues.id },
  //       });
  //       const lessonData = await db.lesson.findOne({
  //         where: { id: logbookData.dataValues.lessonId },
  //       });
  //       const courseData = await db.course.findOne({
  //         where: { code: data.dataValues.courseCode },
  //       });
  //       const teacherData = await db.teacher.findOne({
  //         where: { id: data.dataValues.teacherId },
  //       });
  //       fullData.push({
  //         className: classData.dataValues.name,
  //         week: logbookData.dataValues.week,
  //         day: days[data.dataValues.weekDay],
  //         time: data.dataValues.time,
  //         grade: logbookData.dataValues.grade,
  //         comment: logbookData.dataValues.comment,
  //         note: logbookData.dataValues.note,
  //         courseName: courseData.dataValues.name,
  //         lessonName: lessonData.dataValues.name,
  //         teacherName: teacherData.dataValues.name,
  //         academicYear: `${req.params.year}-${parseInt(req.params.year) + 1}`,
  //       });
  //     }
  //   }
  //   res.send(fullData);
  // },

  // async findByClass(req, res) {
  //   const days = {
  //     1: "Monday",
  //     2: "Tuesday",
  //     3: "Wednesday",
  //     4: "Thursday",
  //     5: "Friday",
  //     6: "Saturday",
  //     7: "Sunday",
  //   };
  //   const token = req.headers["x-access-token"];
  //   jwt.verify(token, config.secret, (err, decoded) => {
  //     req.userId = decoded.id;
  //   });
  //   const allClassData = await db.class.findAll({
  //     where: {
  //       academicYearId: req.params.year,
  //       name: req.params.className,
  //     },
  //   });
  //   if (!allClassData || allClassData.length === 0) {
  //     return res.status(400).json({ message: "data not found!" });
  //   }
  //   const fullData = [];
  //   for (const classData of allClassData) {
  //     const timetableData = await db.timetable.findAll({
  //       where: {
  //         teacherId: req.userId,
  //         classId: classData.dataValues.id,
  //       },
  //     });
  //     for (const data of timetableData) {
  //       const logbookData = await db.logbook.findOne({
  //         where: { timetableId: data.dataValues.id },
  //       });
  //       const lessonData = await db.lesson.findOne({
  //         where: { id: logbookData.dataValues.lessonId },
  //       });
  //       const courseData = await db.course.findOne({
  //         where: { code: data.dataValues.courseCode },
  //       });
  //       const teacherData = await db.teacher.findOne({
  //         where: { id: data.dataValues.teacherId },
  //       });
  //       fullData.push({
  //         className: classData.dataValues.name,
  //         week: logbookData.dataValues.week,
  //         day: days[data.dataValues.weekDay],
  //         time: data.dataValues.time,
  //         grade: logbookData.dataValues.grade,
  //         comment: logbookData.dataValues.comment,
  //         note: logbookData.dataValues.note,
  //         courseName: courseData.dataValues.name,
  //         lessonName: lessonData.dataValues.name,
  //         teacherName: teacherData.dataValues.name,
  //         academicYear: `${req.params.year}-${parseInt(req.params.year) + 1}`,
  //       });
  //     }
  //   }
  //   res.send(fullData);
  // },
  // async findByClassAndDay(req, res) {
  //   const days = {
  //     monday: 1,
  //     tuesday: 2,
  //     wednesday: 3,
  //     thursday: 4,
  //     friday: 5,
  //     saturday: 6,
  //     sunday: 7,
  //   };
  //   if (!(req.params.day in days)) {
  //     return res.status(400).json({ message: "day is not valid" });
  //   }
  //   const token = req.headers["x-access-token"];
  //   jwt.verify(token, config.secret, (err, decoded) => {
  //     req.userId = decoded.id;
  //   });
  //   const allClassData = await db.class.findAll({
  //     where: {
  //       academicYearId: req.params.year,
  //       name: req.params.className,
  //     },
  //   });
  //   if (!allClassData || allClassData.length === 0) {
  //     return res.status(400).json({ message: "data not found!" });
  //   }
  //   const fullData = [];
  //   for (const classData of allClassData) {
  //     const timetableData = await db.timetable.findAll({
  //       where: {
  //         teacherId: req.userId,
  //         classId: classData.dataValues.id,
  //         weekDay: days[req.params.day],
  //       },
  //     });
  //     for (const data of timetableData) {
  //       const logbookData = await db.logbook.findOne({
  //         where: { timetableId: data.dataValues.id },
  //       });
  //       const lessonData = await db.lesson.findOne({
  //         where: { id: logbookData.dataValues.lessonId },
  //       });
  //       const courseData = await db.course.findOne({
  //         where: { code: data.dataValues.courseCode },
  //       });
  //       const teacherData = await db.teacher.findOne({
  //         where: { id: data.dataValues.teacherId },
  //       });
  //       fullData.push({
  //         className: classData.dataValues.name,
  //         week: logbookData.dataValues.week,
  //         day: req.params.day,
  //         time: data.dataValues.time,
  //         grade: logbookData.dataValues.grade,
  //         comment: logbookData.dataValues.comment,
  //         note: logbookData.dataValues.note,
  //         courseName: courseData.dataValues.name,
  //         lessonName: lessonData.dataValues.name,
  //         teacherName: teacherData.dataValues.name,
  //         academicYear: `${req.params.year}-${parseInt(req.params.year) + 1}`,
  //       });
  //     }
  //   }
  //   res.send(fullData);
  // },
  // async findByStudent(req, res) {},
  // async update(req, res) {},
  // async delete(req, res) {},
};
