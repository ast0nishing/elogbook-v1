import httpStatus from "http-status";
import { default as db } from "../models/index.js";
import argon2 from "argon2";
import { randomBytes } from "crypto";

const isSchool = async (req) => {
  const school = await db.school.findOne({
    where: { id: req.user.id },
  });
  return school;
};

export default {
  // TIME TABLE
  async createTimeTable(req, res) {
    const school = await isSchool(req);
    if (school === null) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ msg: "do not have authority" });
    }

    console.log("------------ Execution --------------");
    console.log(school.toJSON());
    console.log("------------ Execution --------------");

    const alreadyExist = [];

    const missingInfo = [];
    const invalidId = [];
    const timeTables = req.body;
    const schoolCheck = [school.idSchool, "-"].join("");

    try {
      for (const timeTable of timeTables) {
        if (
          !timeTable.fromWeek ||
          !timeTable.toWeek ||
          !timeTable.weekDay ||
          !timeTable.time ||
          !timeTable.classId ||
          !timeTable.courseCode ||
          !timeTable.teacherId
        ) {
          missingInfo.push(timeTable);
          continue;
        }

        if (
          !timeTable.teacherId.includes(schoolCheck) ||
          !timeTable.classId.includes(schoolCheck)
        ) {
          console.log(
            `Teacher ID ${timeTable.teacherId} or class ID ${timeTable.classId}  do not belong to the school, cannot create time table`
          );
          invalidId.push({
            "class ID": timeTable.classId,
            "teacher ID": timeTable.teacherId,
          });
          continue;
        }

        const teacherExist = await db.teacher.findOne({
          where: { idSchool: timeTable.teacherId },
        });
        const classExist = await db.class.findOne({
          where: { idSchool: timeTable.classId },
        });
        if (!teacherExist || !classExist) {
          console.log(
            `Class ID ${timeTable.classId} or Teacher ID ${timeTable.teacherId} do not exist --> cannot create new timeTable`
          );
          invalidId.push({
            "class ID": timeTable.classId,
            "teacher ID": timeTable.teacherId,
          });
          continue;
        }

        // Update id for class and teacher

        timeTable.classId = classExist.id;
        timeTable.teacherId = teacherExist.id;
        const timetableExist = await db.timetable.findOne({
          where: {
            fromWeek: timeTable.fromWeek,
            toWeek: timeTable.toWeek,
            weekDay: timeTable.weekDay,
            time: timeTable.time,
            classId: timeTable.classId,
            courseCode: timeTable.courseCode,
            teacherId: timeTable.teacherId,
          },
        });

        console.log(timetableExist);
        if (timetableExist) {
          console.log(`Time table already exist, cannot create`);
          // console.log(timetableExist.toJSON());

          alreadyExist.push(timeTable);
          continue;
        }

        const newTimeTable = await db.timetable.create(timeTable);
        console.log(`CREATE NEW TIME TABLE`, newTimeTable.toJSON());
      }

      if (
        missingInfo.length === 0 &&
        invalidId.length === 0 &&
        alreadyExist.length === 0
      ) {
        return res
          .status(httpStatus.OK)
          .json({ msg: "Create all timetable success" });
      }
      return res.status(httpStatus.OK).json({
        "Missing primary info": missingInfo,
        "Invalid Class or Teacher ID": invalidId,
        "Already exists time table": alreadyExist,
      });
    } catch (err) {
      console.log(err);
    }
  },

  // TEACHER
  async createTeacher(req, res) {
    const school = await isSchool(req);
    if (school === null) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ msg: "do not have authority" });
    }
    console.log("------------ Execution --------------");
    console.log(school.toJSON());
    console.log("------------ Execution --------------");

    const alreadyExist = [];

    const missingInfo = [];
    const invalidIdSchool = [];
    const teachers = req.body;
    const schoolCheck = [school.idSchool, "-"].join("");

    try {
      for (const teacher of teachers) {
        if (
          !teacher.idSchool ||
          !teacher.username ||
          !teacher.password ||
          !teacher.name ||
          !teacher.major ||
          !teacher.phoneNumber ||
          !teacher.email
        ) {
          missingInfo.push(teacher);
          continue;
        }
        if (!teacher.idSchool.includes(schoolCheck)) {
          console.log(
            `ID ${teacher.idSchool} do not belong to the school, cannot create`
          );
          invalidIdSchool.push(teacher.idSchool);
          continue;
        }

        const teacherExist = await db.teacher.findOne({
          where: { idSchool: teacher.idSchool },
        });
        if (teacherExist) {
          console.log(
            `ID ${teacher.idSchool} already exists --> cannot create new teacher ${teacher.name}`
          );
          alreadyExist.push(teacher.idSchool);
          continue;
        }
        const salt = randomBytes(32);
        teacher.password = await argon2.hash(teacher.password, {
          salt,
        });
        teacher.schoolId = school.id;
        // Generate security secret
        teacher.securitySecret = randomBytes(32).toString("hex");

        console.log(
          `CREATE NEW TEACHER %s - %s`,
          teacher.idSchool,
          teacher.name
        );

        await db.teacher.create(teacher);
      }
      if (
        alreadyExist.length === 0 &&
        missingInfo.length === 0 &&
        invalidIdSchool.length === 0
      ) {
        return res
          .status(httpStatus.OK)
          .json({ msg: "Add all teachers success" });
      }

      return res.status(httpStatus.OK).json({
        "Already exist(s) idSchool(s)": alreadyExist,
        "Missing primary information (7 fields in total)": missingInfo,
        "Invalid idSchool": invalidIdSchool,
      });
    } catch (err) {
      console.log(err);
    }
  },

  // CLASS
  async createClass(req, res) {
    const school = await isSchool(req);
    if (school === null) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ msg: "do not have authority" });
    }
    console.log("------------ Execution --------------");
    console.log(school.toJSON());
    console.log("------------ Execution --------------");

    const alreadyExist = [];

    const missingInfo = [];
    const invalidIdSchool = [];
    const invalidTeacherId = [];
    const students = req.body;
    const schoolCheck = [school.idSchool, "-"].join("");

    try {
      for (const aClass of students) {
        if (!aClass.idSchool || !aClass.name || !aClass.academicYearId) {
          missingInfo.push(aClass);
          continue;
        }
        if (!aClass.idSchool.includes(schoolCheck)) {
          console.log(
            `ID ${aClass.idSchool} do not belong to the school, cannot create`
          );
          invalidIdSchool.push(aClass.idSchool);
          continue;
        }
        if (aClass.teacherId) {
          const teacherExist = await db.teacher.findOne({
            where: { idSchool: aClass.teacherId },
          });
          if (!teacherExist) {
            aClass.teacherId = null;
            invalidTeacherId.push(aClass.idSchool);
          } else {
            aClass.teacherId = teacherExist.id;
          }
        }

        const classExist = await db.class.findOne({
          where: { idSchool: aClass.idSchool },
        });
        if (classExist) {
          console.log(
            `ID ${aClass.idSchool} already exists --> cannot create new class ${aClass.name}`
          );
          alreadyExist.push(aClass.idSchool);
          continue;
        }

        console.log(`CREATE NEW CLASS %s - %s`, aClass.idSchool, aClass.name);
        aClass.schoolId = school.id;
        await db.class.create(aClass);
      }
      if (
        alreadyExist.length === 0 &&
        missingInfo.length === 0 &&
        invalidIdSchool.length === 0
      ) {
        return res.status(httpStatus.OK).json({
          msg: "Add all classes success",
          "Invalid or nonexist teacher ID (if any)": invalidTeacherId,
        });
      }

      return res.status(httpStatus.OK).json({
        "Already exist(s) idSchool(s)": alreadyExist,
        "Missing primary information": missingInfo,
        "Invalid School ID": invalidIdSchool,
        "Invalid teacher ID (if any)": invalidTeacherId,
      });
    } catch (err) {
      console.log(err);
    }
  },

  // STUDENT
  async createStudent(req, res) {
    const school = await isSchool(req);
    if (school === null) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ msg: "do not have authority" });
    }
    console.log("------------ Execution --------------");
    console.log(school.toJSON());
    console.log("------------ Execution --------------");

    const alreadyExist = [];

    const missingInfo = [];
    const invalidIdSchool = [];
    const invalidClassId = [];
    const students = req.body;
    const schoolCheck = [school.idSchool, "-"].join("");

    try {
      for (const student of students) {
        if (
          !student.idSchool ||
          !student.username ||
          !student.password ||
          !student.name ||
          !student.phoneNumber ||
          !student.email
        ) {
          missingInfo.push(student);
          continue;
        }
        if (!student.idSchool.includes(schoolCheck)) {
          console.log(
            `ID ${student.idSchool} do not belong to the school, cannot create`
          );
          invalidIdSchool.push(student.idSchool);
          continue;
        }

        const studentExist = await db.student.findOne({
          where: { idSchool: student.idSchool },
        });
        if (studentExist) {
          console.log(
            `ID ${student.idSchool} already exists --> cannot create new student ${student.name}`
          );
          alreadyExist.push(student.idSchool);
          continue;
        }

        const salt = randomBytes(32);
        student.password = await argon2.hash(student.password, {
          salt,
        });
        student.schoolId = school.id;
        // Generate security secret
        student.securitySecret = randomBytes(32).toString("hex");

        console.log(
          `CREATE NEW STUDENT %s - %s`,
          student.idSchool,
          student.name
        );

        const newStudent = await db.student.create(student);
        if (student.classId) {
          const classExist = await db.class.findOne({
            where: { idSchool: student.classId },
          });
          // console.log(schoolCheck);
          // console.log(student.classId);
          if (!classExist) {
            invalidClassId.push(student.idSchool);
          } else {
            console.log(classExist.toJSON());

            await classExist.addStudent(newStudent, {
              through: "class_student",
            });
          }
        }
      }
      if (
        alreadyExist.length === 0 &&
        missingInfo.length === 0 &&
        invalidIdSchool.length === 0
      ) {
        return res.status(httpStatus.OK).json({
          msg: "Add all students success",
          "Invalid or nonexist Class ID (if any)": invalidClassId,
        });
      }

      return res.status(httpStatus.OK).json({
        "Already exist(s) idSchool(s)": alreadyExist,
        "Missing primary information (6 fields in total)": missingInfo,
        "Invalid idSchool": invalidIdSchool,
        "Invalid or nonexist Class ID (if any)": invalidClassId,
      });
    } catch (err) {
      console.log(err);
    }
  },

  // CLASS ADD TEACHER
  async classAddTeacher(req, res) {
    const school = await isSchool(req);
    if (school === null) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ msg: "do not have authority" });
    }
    console.log("------------ Execution --------------");
    console.log(school.toJSON());
    console.log("------------ Execution --------------");

    const invalidIdSchool = [];
    const invalidTeacherIdSchool = [];
    const classes = req.body;
    const missingInfo = [];
    const schoolCheck = [school.idSchool, "-"].join("");

    try {
      for (const aClass of classes) {
        if (
          !aClass.idSchool ||
          !aClass.teacherId ||
          !aClass.teacherName ||
          !aClass.name
        ) {
          missingInfo.push(aClass);
          continue;
        }
        const teacher = {};
        teacher.idSchool = aClass.teacherId;
        teacher.name = aClass.teacherName;

        const targetClass = await db.class.findOne({
          where: {
            idSchool: aClass.idSchool,
            name: aClass.name,
            schoolId: school.id,
          },
        });
        console.log("------------ Execution --------------");
        console.log(targetClass.toJSON());
        console.log("------------ Execution --------------");

        if (!targetClass) {
          console.log(
            `Class ${aClass.idSchool} - ${aClass.name} do not exist, cannot add head teacher`
          );
          invalidIdSchool.push(aClass.idSchool);
          continue;
        }

        if (!teacher.idSchool.includes(schoolCheck)) {
          console.log(
            `ID ${teacher.idSchool} do not belong to the school, cannot become class head teacher`
          );
          invalidTeacherIdSchool.push(teacher.idSchool);
          continue;
        }
        const teacherExist = await db.teacher.findOne({
          where: { idSchool: teacher.idSchool, name: teacher.name },
        });

        if (!teacherExist) {
          console.log(
            `Teacher ID ${teacher.idSchool} does not exist --> cannot become class's head teacher`
          );
          invalidTeacherIdSchool.push(teacher.idSchool);
          continue;
        }

        // await targetClass.addTeacher(teacherExist);
        await teacherExist.addClass(targetClass);
      }
      if (missingInfo.length === 0 && invalidIdSchool.length === 0) {
        return res.status(httpStatus.OK).json({
          msg: `Done`,
          "Invalid or nonexist Class ID (if any)": invalidIdSchool,
          "Invalid or nonexist Teacher ID (if any)": invalidTeacherIdSchool,
          "Missing info": missingInfo,
        });
      }

      return res.status(httpStatus.OK).json({
        "Invalid or nonexist Class ID (if any)": invalidIdSchool,
        "Invalid or nonexist Teacher ID (if any)": invalidTeacherIdSchool,
      });
    } catch (err) {
      console.log(err);
    }
  },

  // CLASS ADD STUDENT
  async classAddStudents(req, res) {
    const school = await isSchool(req);
    if (school === null) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ msg: "do not have authority" });
    }
    console.log("------------ Execution --------------");
    console.log(school.toJSON());
    console.log("------------ Execution --------------");

    const invalidIdSchool = [];
    const invalidStudentIdSchool = [];
    const classes = req.body;
    const missingInfo = [];
    const schoolCheck = [school.idSchool, "-"].join("");

    try {
      for (const aClass of classes) {
        if (!aClass.idSchool || !aClass.students || !aClass.name) {
          missingInfo.push(aClass);
          continue;
        }

        const targetClass = await db.class.findOne({
          where: {
            idSchool: aClass.idSchool,
            name: aClass.name,
            schoolId: school.id,
          },
        });
        if (!targetClass) {
          console.log(
            `Class ${aClass.idSchool} - ${aClass.name} do not exist, cannot add students`
          );
          invalidIdSchool.push(aClass.idSchool);
          continue;
        }
        for (const student of aClass.students) {
          if (!student.idSchool.includes(schoolCheck)) {
            console.log(
              `ID ${student.idSchool} do not belong to the school, cannot add into class`
            );
            invalidStudentIdSchool.push(student.idSchool);
            continue;
          }
          const studentExist = await db.student.findOne({
            where: {
              idSchool: student.idSchool,
              name: student.name,
            },
          });

          if (!studentExist) {
            console.log(
              `Student ${student.idSchool} does not exist --> cannot added into class`
            );
            invalidStudentIdSchool.push(student.idSchool);
            continue;
          }

          await targetClass.addStudent(studentExist, {
            through: "class_student",
          });
        }
      }
      if (missingInfo.length === 0 && invalidIdSchool.length === 0) {
        return res.status(httpStatus.OK).json({
          msg: `Add all students into class success`,
          "Invalid or nonexist Class ID (if any)": invalidIdSchool,
          "Invalid or nonexist Student ID (if any)": invalidStudentIdSchool,
          "Missing info": missingInfo,
        });
      }

      return res.status(httpStatus.OK).json({
        "Invalid or nonexist Class ID (if any)": invalidIdSchool,
        "Invalid or nonexist Student ID (if any)": invalidStudentIdSchool,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
