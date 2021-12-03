// import db from "../models/index.js";
import { default as db } from "../models/index.js";
import httpStatus from "http-status";

export default {
  async create(req, res) {
    const teacher = await db.teacher.findOne({
      where: { id: req.user.id },
    });
    console.log("------------ Execution --------------");
    console.log(teacher.toJSON());
    console.log("------------ Execution --------------");

    const logbooks = req.body;

    const alreadyExist = [];
    const missingInfo = [];
    const nonExistTimetable = [];

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
          nonExistTimetable.push(logbook.timetableId);
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
        nonExistTimetable.length === 0 &&
        alreadyExist.length === 0
      ) {
        return res
          .status(httpStatus.OK)
          .json({ msg: "Create all logbooks success" });
      }

      return res.status(httpStatus.BAD_REQUEST).json({
        "Already Exist logbook": alreadyExist,
        "Missing primary info": missingInfo,
        "Nonexist Time table ID": nonExistTimetable,
      });
    } catch (err) {
      console.log(err);
    }
  },

  async findByClassAndDay(req, res) {
    const days = {
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 7,
    };
    if (!(req.params.day in days)) {
      return res.status(400).json({ message: "day is not valid" });
    }
    const allClassData = await db.class.findAll({
      where: {
        academicYearId: req.params.year,
        idSchool: req.params.idSchool,
      },
    });
    if (!allClassData || allClassData.length === 0) {
      return res.status(400).json({ message: "data not found!" });
    }
    const fullData = [];
    for (const classData of allClassData) {
      const timetableData = await db.timetable.findAll({
        where: {
          // teacherId: req.userId,
          classId: classData.dataValues.id,
          weekDay: days[req.params.day],
        },
      });
      for (const data of timetableData) {
        const logbookData = await db.logbook.findOne({
          where: { timetableId: data.dataValues.id },
        });
        if (!logbookData) continue;
        const lessonData = await db.lesson.findOne({
          where: { id: logbookData.dataValues.lessonId },
        });
        const courseData = await db.course.findOne({
          where: { code: data.dataValues.courseCode },
        });
        const teacherData = await db.teacher.findOne({
          where: { id: data.dataValues.teacherId },
        });
        fullData.push({
          className: classData.dataValues.name,
          week: logbookData.dataValues.week,
          day: req.params.day,
          time: data.dataValues.time,
          grade: logbookData.dataValues.grade,
          comment: logbookData.dataValues.comment,
          note: logbookData.dataValues.note,
          courseName: courseData.dataValues.name,
          lessonName: lessonData.dataValues.name,
          teacherName: teacherData.dataValues.name,
          academicYear: `${req.params.year}-${parseInt(req.params.year) + 1}`,
        });
      }
    }
    res.send(fullData);
  },
  async findByClass(req, res) {
    const days = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday",
    };
    // console.log('asdasda');
    // return;
    const classData = await db.class.findOne({
      where: {
        academicYearId: req.params.year,
        idSchool: req.params.idSchool,
      },
    });
    const fullData = {};
    fullData.className = classData.dataValues.name;

    fullData.academicYear = `${req.params.year}-${
      parseInt(req.params.year) + 1
    }`;
    fullData.logbooks = [];
    const timetableData = await db.timetable.findAll({
      where: {
        classId: classData.dataValues.id,
      },
    });
    for (const data of timetableData) {
      const logbookData = await db.logbook.findOne({
        where: { timetableId: data.dataValues.id },
      });
      if (!logbookData) continue;
      const lessonData = await db.lesson.findOne({
        where: { id: logbookData.dataValues.lessonId },
      });
      const courseData = await db.course.findOne({
        where: { code: data.dataValues.courseCode },
      });
      const teacherData = await db.teacher.findOne({
        where: { id: data.dataValues.teacherId },
      });
      fullData.logbooks.push({
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
    }

    res.send(fullData);
  },
  async findByYear(req, res) {
    const days = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday",
    };
    // console.log('asdasda');
    // return;
    const allClassData = await db.class.findAll({
      where: {
        academicYearId: req.params.year,
        teacherId: req.user.id,
      },
    });
    if (!allClassData || allClassData.length === 0) {
      return res.status(400).json({ message: "data not found!" });
    }
    const fullData = [];
    for (const classData of allClassData) {
      const timetableData = await db.timetable.findAll();
      for (const data of timetableData) {
        console.log(data.dataValues.id);
        const logbookData = await db.logbook.findOne({
          where: { timetableId: data.dataValues.id },
        });
        if (!logbookData) continue;
        const lessonData = await db.lesson.findOne({
          where: { id: logbookData.dataValues.lessonId },
        });
        const courseData = await db.course.findOne({
          where: { code: data.dataValues.courseCode },
        });
        const teacherData = await db.teacher.findOne({
          where: { id: data.dataValues.teacherId },
        });
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
          academicYear: `${req.params.year}-${parseInt(req.params.year) + 1}`,
        });
      }
    }
    res.send(fullData);
  },
  async findByClassAndDay(req, res) {
    const days = {
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 7,
    };
    if (!(req.params.day in days)) {
      return res.status(400).json({ message: "day is not valid" });
    }
    const allClassData = await db.class.findAll({
      where: {
        academicYearId: req.params.year,
        idSchool: req.params.idSchool,
      },
    });
    if (!allClassData || allClassData.length === 0) {
      return res.status(400).json({ message: "data not found!" });
    }
    const fullData = [];
    for (const classData of allClassData) {
      const timetableData = await db.timetable.findAll({
        where: {
          // teacherId: req.userId,
          classId: classData.dataValues.id,
          weekDay: days[req.params.day],
        },
      });
      for (const data of timetableData) {
        const logbookData = await db.logbook.findOne({
          where: { timetableId: data.dataValues.id },
        });
        if (!logbookData) continue;
        const lessonData = await db.lesson.findOne({
          where: { id: logbookData.dataValues.lessonId },
        });
        const courseData = await db.course.findOne({
          where: { code: data.dataValues.courseCode },
        });
        const teacherData = await db.teacher.findOne({
          where: { id: data.dataValues.teacherId },
        });
        fullData.push({
          className: classData.dataValues.name,
          week: logbookData.dataValues.week,
          day: req.params.day,
          time: data.dataValues.time,
          grade: logbookData.dataValues.grade,
          comment: logbookData.dataValues.comment,
          note: logbookData.dataValues.note,
          courseName: courseData.dataValues.name,
          lessonName: lessonData.dataValues.name,
          teacherName: teacherData.dataValues.name,
          academicYear: `${req.params.year}-${parseInt(req.params.year) + 1}`,
        });
      }
    }
    res.send(fullData);
  },
  async findByYearClassWeekDay(req, res) {
    const days = {
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 7,
    };
    if (!(req.params.day in days)) {
      return res.status(400).json({ message: "day is not valid" });
    }
    const classData = await db.class.findOne({
      where: {
        academicYearId: req.params.year,
        idSchool: req.params.idSchool,
      },
    });
    if (classData === null) return res.send("data not found");
    // if (!allClassData || allClassData.length === 0) {
    //     return res.status(400).json({ message: 'data not found!' });
    // }
    const fullData = {};
    const timetableData = await db.timetable.findAll({
      where: {
        // teacherId: req.userId,
        classId: classData.dataValues.id,
        weekDay: days[req.params.day],
      },
    });
    fullData.className = classData.dataValues.name;
    fullData.week = req.params.week;
    fullData.day = req.params.day;
    fullData.academicYear = `${req.params.year}-${
      parseInt(req.params.year) + 1
    }`;
    fullData.logbooks = [];
    for (const data of timetableData) {
      if (
        data.dataValues.fromWeek <= req.params.week &&
        (data.dataValues.toWeek >= req.params.week ||
          data.dataValues.toWeek === -1)
      ) {
        const logbookData = await db.logbook.findOne({
          where: { timetableId: data.dataValues.id },
        });
        if (!logbookData) continue;
        const lessonData = await db.lesson.findOne({
          where: { id: logbookData.dataValues.lessonId },
        });
        const courseData = await db.course.findOne({
          where: { code: data.dataValues.courseCode },
        });
        const teacherData = await db.teacher.findOne({
          where: { id: data.dataValues.teacherId },
        });
        fullData.logbooks.push({
          time: data.dataValues.time,
          grade: logbookData.dataValues.grade,
          comment: logbookData.dataValues.comment,
          note: logbookData.dataValues.note,
          courseName: courseData.dataValues.name,
          lessonName: lessonData.dataValues.name,
          teacherName: teacherData.dataValues.name,
        });
      }
    }

    res.send(fullData);
  },
  // async findByStudent(req, res) {},
  // async update(req, res) {},
  // async delete(req, res) {},
};
