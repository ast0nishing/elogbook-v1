/** @format */

import httpStatus from "http-status";
import { default as db } from "../models/index.js";
import argon2 from "argon2";
import { randomBytes } from "crypto";
import { default as createStudentStrategy } from "../utils/createStudent.js";

const findSchool = async (id) => {
  const school = await db.school.findOne({
    where: { id },
  });
  return school;
};
const getClassInfoStrategy = (aClass) => {
  const info = {
    idSchool: aClass.idSchool,
    name: aClass.name,
    academicYearId: aClass.academicYearId,
    teacherId: aClass.teacherId,
  };
  return info;
};

export default {
  // TIME TABLE
  async createTimeTable(req, res) {
    const school = await findSchool(req.user.id);
    console.log("------------ Execution --------------");
    console.log(school.toJSON());
    console.log("------------ Execution --------------");

    const classes = req.body;

    const alreadyExist = [];
    const missingInfo = [];
    const invalidClassId = [];
    const invalidTeacherId = [];
    const nonExistCourseCode = [];
    const nonExistClass = [];
    const nonExistTeacher = [];

    const schoolCheck = [school.idSchool, "-"].join("");

    try {
      // CHECK FOR ALL INVALID INFO
      for (const aClass of classes) {
        const classId = aClass.classId;
        if (!classId.includes(schoolCheck)) {
          console.log(
            `class ID ${classId} do not belong to the school, cannot create all the timetables related to the class`
          );
          invalidClassId.push(classId);
          continue;
        }
        const classExist = await db.class.findOne({
          where: { idSchool: classId },
        });
        if (!classExist) {
          console.log(
            `Class ID ${classId} do not exist --> cannot create all the timetable related to the class`
          );
          nonExistClass.push({
            class: classId,
          });
          continue;
        }
        const fromWeek = aClass.fromWeek;
        if (!fromWeek) {
          console.log(
            `class ${classId} missing fromWeek info, cannot create all timetables related to the class`
          );
          missingInfo.push({
            class: classId,
            missingInfo: "fromWeek",
          });
          continue;
        }
        const subjects = aClass.subjects;
        for (const subject of subjects) {
          const courseCode = subject.courseCode;
          const teacherId = subject.teacherId;
          const blocks = subject.blocks;
          // Check for missing info and invalid teacher ID
          if (
            !courseCode ||
            !teacherId ||
            !blocks ||
            JSON.stringify(blocks) === "{}"
          ) {
            console.log(
              `class ${classId} missing course code or teacher ID or blocks property, cannot create all the timetables related to the class`
            );
            missingInfo.push({
              class: classId,
              missingInfo: "Course code or blocks or teacher ID",
              courseCode: courseCode || false,
              teacherId: teacherId || false,
              hasBlocks: !(JSON.stringify(blocks) === "{}"),
            });
            continue;
          }
          if (!teacherId.includes(schoolCheck)) {
            console.log(
              `class ${classId} has Teacher ID ${teacherId} that not belong to the school, cannot create all the timetables related the class`
            );
            invalidTeacherId.push({
              class: classId,
              course: courseCode,
              teacher: teacherId,
            });
            continue;
          }

          // Check for existent
          const courseExist = await db.course.findOne({
            where: { code: courseCode },
          });
          if (!courseExist) {
            console.log(
              `class ID ${classId} has code course ${courseCode} that not exist, cannot create all the timetables related to the class`
            );
            nonExistCourseCode.push({
              class: classId,
              course: courseCode,
            });
            continue;
          }
          const teacherExist = await db.teacher.findOne({
            where: { idSchool: teacherId },
          });

          if (!teacherExist) {
            console.log(
              `Class ID ${classId} has Teacher ID ${teacherId} that does not exist --> cannot create all the timetable related to the class`
            );
            nonExistTeacher.push({
              teacher: teacherId,
            });
            continue;
          }
          for (const block of blocks) {
            const timeTable = {};
            timeTable.classId = classExist.id;
            timeTable.fromWeek = fromWeek;

            timeTable.courseCode = courseCode;

            timeTable.teacherId = teacherExist.id;

            timeTable.weekDay = block.weekDay;
            timeTable.time = block.time;
            const timetableExist = await db.timetable.findOne({
              where: {
                fromWeek: timeTable.fromWeek,
                weekDay: timeTable.weekDay,
                time: timeTable.time,
                classId: timeTable.classId,
                courseCode: timeTable.courseCode,
                teacherId: timeTable.teacherId,
              },
            });

            if (timetableExist) {
              console.log(
                `class ${classId} has a timetable that already exist, cannot create all the timetable related to the Class`
              );
              console.log("------------------------Exist-----------------");
              console.log(timetableExist.toJSON());
              console.log("------------------------Exist-----------------");

              const info = {
                courseCode: timeTable.courseCode,
                teacherId: timeTable.teacherId,
                block: block,
              };
              alreadyExist.push({
                class: aClass.classId,
                "Already Exist TimeTable": info,
              });
              continue;
            }
          }
        }
      }

      if (
        missingInfo.length !== 0 ||
        invalidTeacherId.length !== 0 ||
        invalidClassId.length !== 0 ||
        nonExistCourseCode.length !== 0 ||
        nonExistTeacher.length !== 0 ||
        nonExistClass.length !== 0 ||
        alreadyExist.length !== 0
      ) {
        return res.status(httpStatus.BAD_REQUEST).json({
          msg: "Please fix all the related issues to create the timetables",
          "Missing info": missingInfo,
          "Non exist class": nonExistClass,
          "Invalid Teacher ID": invalidTeacherId,
          "Invalid Class ID": invalidClassId,
          "Nonexist course code": nonExistCourseCode,
          "Non exist teacher": nonExistTeacher,
          "Already exist timeTable": alreadyExist,
        });
      }
      for (const aClass of classes) {
        const fromWeek = aClass.fromWeek;
        // find classId field in timetable
        const targetClass = await db.class.findOne({
          where: { idSchool: aClass.classId },
        });
        const classId = targetClass.id;

        // change current timetable toWeek value (current is define as -1)
        const currentTimeTables = await db.timetable.findAll({
          where: {
            classId: classId,
            toWeek: -1,
          },
        });
        for (const timeTable of currentTimeTables) {
          timeTable.toWeek = fromWeek - 1;
          await timeTable.save();
        }
        // create all Timetable
        const subjects = aClass.subjects;
        for (const subject of subjects) {
          const courseCode = subject.courseCode;
          // find teacherId field in timetable
          const targetTeacher = await db.teacher.findOne({
            where: { idSchool: subject.teacherId },
          });

          const teacherId = targetTeacher.id;
          const blocks = subject.blocks;

          // create
          for (const block of blocks) {
            const timeTable = {};
            timeTable.fromWeek = fromWeek;
            timeTable.weekDay = block.weekDay;
            timeTable.time = block.time;
            timeTable.classId = classId;
            timeTable.courseCode = courseCode;
            timeTable.teacherId = teacherId;

            const newTimeTable = await db.timetable.create(timeTable);
            console.log(`CREATE NEW TIME TABLE`, newTimeTable.toJSON());
          }
        }
      }

      return res.status(httpStatus.OK).json({
        msg: "Create all timetables success",
      });
    } catch (err) {
      console.log(err);
    }
  },

  // TEACHER
  async createTeacher(req, res) {
    const school = await findSchool(req.user.id);

    console.log("------------ Execution --------------");
    console.log(school.toJSON());
    console.log("------------ Execution --------------");

    const teachers = req.body;

    const alreadyExist = [];
    const missingInfo = [];
    const invalidTeacherId = [];
    const invalidUsernameSuffix = [];

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
          invalidTeacherId.push(teacher);
          continue;
        }

        // Check for consistent username
        // Ex: idSchool -- LA0102-T12001 --> username t12001@LA0102
        const idSchoolarray = teacher.idSchool.split("-");
        const validUsernameSuffix = `${idSchoolarray[1].toLowerCase()}@${
          idSchoolarray[0]
        }`;
        const usernameArray = teacher.username.split(".");
        const usernameSuffix = usernameArray[usernameArray.length - 1];
        if (usernameSuffix !== validUsernameSuffix) {
          console.log(
            `ID ${teacher.idSchool} does not have a consistent username suffix (teacherId@schoolId), please check for typo error`
          );
          invalidUsernameSuffix.push(teacher);
          continue;
        }

        const teacherExist = await db.teacher.findOne({
          where: { idSchool: teacher.idSchool },
        });
        if (teacherExist) {
          console.log(
            `ID ${teacher.idSchool} already exists --> cannot create new teacher ${teacher.name}`
          );
          alreadyExist.push(teacher);
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
        missingInfo.length === 0 &&
        invalidTeacherId.length === 0 &&
        invalidUsernameSuffix.length === 0 &&
        alreadyExist.length === 0
      ) {
        return res
          .status(httpStatus.OK)
          .json({ msg: "Add all teachers success" });
      }
      return res.status(httpStatus.BAD_REQUEST).json({
        "Missing primary info": missingInfo,
        "Invalid Teacher ID": invalidTeacherId,
        "Invalid username suffix": invalidUsernameSuffix,
        "Already exists teacher": alreadyExist,
      });
    } catch (err) {
      console.log(err);
    }
  },

  // CLASS
  async createClass(req, res) {
    const school = await findSchool(req.user.id);

    console.log("------------ Execution --------------");
    console.log(school.toJSON());
    console.log("------------ Execution --------------");

    const classes = req.body;

    const alreadyExist = [];
    const missingInfo = [];
    const invalidClassId = [];
    const invalidTeacherId = [];
    const nonExistTeacher = [];

    const schoolCheck = [school.idSchool, "-"].join("");

    try {
      for (const aClass of classes) {
        if (!aClass.idSchool || !aClass.name || !aClass.academicYearId) {
          missingInfo.push(aClass);
          continue;
        }
        if (!aClass.idSchool.includes(schoolCheck)) {
          console.log(
            `ID ${aClass.idSchool} do not belong to the school, cannot create`
          );
          invalidClassId.push(getClassInfoStrategy(aClass));
          continue;
        }
        const classExist = await db.class.findOne({
          where: { idSchool: aClass.idSchool },
        });
        if (classExist) {
          console.log(
            `ID ${aClass.idSchool} already exists --> cannot create new class ${aClass.name}`
          );
          alreadyExist.push(getClassInfoStrategy(aClass));
          continue;
        }

        if (aClass.teacherId) {
          if (!aClass.teacherId.includes(schoolCheck)) {
            console.log(
              `ID ${aClass.teacherId} do not belong to the school, cannot become head teacher`
            );
            invalidTeacherId.push(getClassInfoStrategy(aClass));
          }

          const teacherExist = await db.teacher.findOne({
            where: { idSchool: aClass.teacherId },
          });
          if (!teacherExist) {
            aClass.teacherId = null;
            nonExistTeacher.push(getClassInfoStrategy(aClass));
          } else {
            aClass.teacherId = teacherExist.id;
          }
        }

        console.log(`CREATE NEW CLASS %s - %s`, aClass.idSchool, aClass.name);
        aClass.schoolId = school.id;
        await db.class.create(aClass);
      }
      if (
        missingInfo.length === 0 &&
        alreadyExist.length === 0 &&
        invalidClassId.length === 0 &&
        invalidTeacherId.length === 0 &&
        nonExistTeacher.length === 0
      ) {
        return res.status(httpStatus.OK).json({
          class: "Add all classes success",
        });
      }

      return res.status(httpStatus.BAD_REQUEST).json({
        "Already exist class ID": alreadyExist,
        "Missing primary information": missingInfo,
        "Invalid Class ID": invalidClassId,
        "Invalid teacher ID": invalidTeacherId,
        "Nonexist teacher": nonExistTeacher,
      });
    } catch (err) {
      console.log(err);
    }
  },
  // CREATE CLASS AND STUDENTS
  async createClassAddStudent(req, res) {
    const school = await findSchool(req.user.id);

    console.log("------------ Execution --------------");
    console.log(school.toJSON());
    console.log("------------ Execution --------------");

    const aClass = req.body;

    var invalidTeacherId = false;
    var nonExistTeacher = false;

    const schoolCheck = [school.idSchool, "-"].join("");

    try {
      if (!aClass.idSchool || !aClass.name || !aClass.academicYearId) {
        return res.status(httpStatus.BAD_REQUEST).json({
          msg: "Missing primary information",
        });
      }

      if (!aClass.idSchool.includes(schoolCheck)) {
        console.log(
          `ID ${aClass.idSchool} do not belong to the school, cannot create`
        );
        return res.status(httpStatus.BAD_REQUEST).json({
          msg: "Invalid Class ID (Do not belong to school)",
        });
      }
      const classExist = await db.class.findOne({
        where: { idSchool: aClass.idSchool },
      });
      if (classExist) {
        console.log(
          `ID ${aClass.idSchool} already exists --> cannot create new class ${aClass.name}`
        );
        return res.status(httpStatus.BAD_REQUEST).json({
          msg: "Class already Exist",
        });
      }

      if (aClass.teacherId) {
        if (!aClass.teacherId.includes(schoolCheck)) {
          console.log(
            `ID ${aClass.teacherId} do not belong to the school, cannot become head teacher`
          );
          invalidTeacherId = true;
        }

        const teacherExist = await db.teacher.findOne({
          where: { idSchool: aClass.teacherId },
        });
        if (!teacherExist) {
          aClass.teacherId = null;
          nonExistTeacher = true;
        } else {
          aClass.teacherId = teacherExist.id;
        }
      }

      console.log(`CREATE NEW CLASS %s - %s`, aClass.idSchool, aClass.name);
      aClass.schoolId = school.id;
      await db.class.create(aClass);

      if (aClass.students) {
        const students = aClass.students;
        for (const student of students) {
          student.classId = aClass.idSchool;
        }
        const createStudentInfo = await createStudentStrategy(
          db,
          school,
          students
        );

        if (!invalidTeacherId && !nonExistTeacher) {
          if (
            createStudentInfo.missingInfo.length === 0 &&
            createStudentInfo.invalidStudentId.length === 0 &&
            createStudentInfo.invalidUsernameSuffix.length === 0 &&
            createStudentInfo.invalidClassId.length === 0 &&
            createStudentInfo.alreadyExist.length === 0
          ) {
            return res.status(httpStatus.OK).json({
              class:
                "Create Class and add Head Teacher and add all students success",
            });
          }
          return res.status(httpStatus.BAD_REQUEST).json({
            class: "Create Class and add Head Teacher success",
            students: "Fail to create some students",
            Info: createStudentInfo,
          });
        }
      }

      if (!invalidTeacherId && !nonExistTeacher) {
        return res.status(httpStatus.OK).json({
          class: "Create Class and add Head Teacher success",
        });
      }
      return res.status(httpStatus.BAD_REQUEST).json({
        class:
          "Create Class sucess but fail add Head Teacher because of invalid or non exist teacher",
        "Invalid Teacher ID": invalidTeacherId,
        "Nonexist Teacher": nonExistTeacher,
      });
    } catch (err) {
      console.log(err);
    }
  },

  // CLASS ADD STUDENTS
  async classAddStudents(req, res) {
    const school = await findSchool(req.user.id);

    console.log("------------ Execution --------------");
    console.log(school.toJSON());
    console.log("------------ Execution --------------");

    const classes = req.body;

    const missingInfo = [];
    const invalidClassId = [];
    const nonExistClass = [];
    const invalidStudentId = [];
    const nonExistStudent = [];

    const schoolCheck = [school.idSchool, "-"].join("");

    try {
      for (const aClass of classes) {
        if (!aClass.idSchool || !aClass.students || !aClass.name) {
          missingInfo.push({
            ClassID: aClass.idSchool,
            className: aClass.name,
          });
          continue;
        }
        if (!aClass.idSchool.includes(schoolCheck)) {
          console.log(
            `ID ${aClass.idSchool} do not belong to the school, cannot add student`
          );
          invalidClassId.push({
            ClassID: aClass.idSchool,
            className: aClass.name,
          });
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
          nonExistClass.push({
            ClassID: aClass.idSchool,
            className: aClass.name,
          });
          continue;
        }
        for (const student of aClass.students) {
          if (!student.idSchool.includes(schoolCheck)) {
            console.log(
              `ID ${student.idSchool} do not belong to the school, cannot add into class`
            );
            invalidStudentId.push(student.idSchool);
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
            nonExistStudent.push(student);
            continue;
          }

          await targetClass.addStudent(studentExist, {
            through: "class_student",
          });
        }
      }
      if (
        missingInfo.length === 0 &&
        invalidClassId.length === 0 &&
        nonExistClass.length === 0 &&
        invalidStudentId.length === 0 &&
        nonExistStudent.length === 0
      ) {
        return res.status(httpStatus.OK).json({
          msg: `Add all students into all classes success`,
        });
      }

      return res.status(httpStatus.BAD_REQUEST).json({
        "Missing Info": missingInfo,
        "Invalid Class ID": invalidClassId,
        "Nonexist Class": nonExistClass,
        "Invalid Student ID": invalidStudentId,
        "Nonexist Student ID": nonExistStudent,
      });
    } catch (err) {
      console.log(err);
    }
  },
  // CLASS ADD TEACHER
  async classAddTeacher(req, res) {
    const school = await findSchool(req.user.id);

    console.log("------------ Execution --------------");
    console.log(school.toJSON());
    console.log("------------ Execution --------------");

    const classes = req.body;

    const missingInfo = [];
    const invalidClassId = [];
    const nonExistClass = [];
    const invalidTeacherId = [];
    const nonExistTeacher = [];

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
        if (!aClass.idSchool.includes(schoolCheck)) {
          console.log(
            `ID ${aClass.idSchool} do not belong to the school, cannot add teacher`
          );
          invalidClassId.push({
            ClassID: aClass.idSchool,
            className: aClass.name,
          });
          continue;
        }
        const teacher = {};
        teacher.idSchool = aClass.teacherId;
        teacher.name = aClass.teacherName;
        if (!teacher.idSchool.includes(schoolCheck)) {
          console.log(
            `ID ${teacher.idSchool} do not belong to the school, cannot add teacher`
          );
          invalidTeacherId.push(aClass);
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
            `Class ${aClass.idSchool} - ${aClass.name} do not exist, cannot add head teacher`
          );
          nonExistClass.push({
            ClassID: aClass.idSchool,
            className: aClass.name,
          });
          continue;
        }
        console.log("------------ Execution --------------");
        console.log(targetClass.toJSON());
        console.log("------------ Execution --------------");

        const teacherExist = await db.teacher.findOne({
          where: { idSchool: teacher.idSchool, name: teacher.name },
        });

        if (!teacherExist) {
          console.log(
            `Teacher ID ${teacher.idSchool} does not exist --> cannot become class's head teacher`
          );
          nonExistTeacher.push(aClass);
          continue;
        }
        targetClass.teacherId = teacherExist.id;
        await targetClass.save();

        // await targetClass.addTeacher(teacherExist);
        // await teacherExist.addClass(targetClass);
      }
      if (
        missingInfo.length === 0 &&
        invalidClassId.length === 0 &&
        nonExistClass.length === 0 &&
        invalidTeacherId.length === 0 &&
        nonExistTeacher.length === 0
      ) {
        return res.status(httpStatus.OK).json({
          msg: "Add all teachers to all classes success",
        });
      }

      return res.status(httpStatus.BAD_REQUEST).json({
        "Missing Info": missingInfo,
        "Invalid Class ID": invalidClassId,
        "Nonexist Class": nonExistClass,
        "Invalid Teacher ID": invalidTeacherId,
        "Nonexist Teacher ID": nonExistTeacher,
      });
    } catch (err) {
      console.log(err);
    }
  },

  // STUDENT
  async createStudent(req, res) {
    const school = await findSchool(req.user.id);
    console.log("------------ Execution --------------");
    console.log(school.toJSON());
    console.log("------------ Execution --------------");
    const students = req.body;
    const createStudentInfo = await createStudentStrategy(db, school, students);
    console.log(createStudentInfo);

    if (
      createStudentInfo.missingInfo.length === 0 &&
      createStudentInfo.invalidStudentId.length === 0 &&
      createStudentInfo.invalidUsernameSuffix.length === 0 &&
      createStudentInfo.alreadyExist.length === 0
    ) {
      return res.status(httpStatus.OK).json({
        msg: "Add all students sucess",
      });
    }
    return res.status(httpStatus.BAD_REQUEST).json({
      "Missing info": createStudentInfo.missingInfo,
      "Invalid Student ID": createStudentInfo.invalidStudentId,
      "Invalid Username Suffix": createStudentInfo.invalidUsernameSuffix,
      "Already Exist Students": createStudentInfo.alreadyExist,
      "Invalid Class ID (if any)": createStudentInfo.invalidClassId,
    });
  },
  async findAllTeachersByClassAndYear(req, res) {
    const classData = await db.class.findOne({
      where: {
        name: req.params.className,
        academicYearId: req.params.year,
        schoolId: req.user.id,
      },
    });
    if (!classData) {
      return res.json({ message: "class not found!" });
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
        console.log(timetableData.dataValues);
        teacherId.push({
          teacherId: teacherData.dataValues.idSchool,
          name: teacherData.dataValues.name,
        });
      }
    }
    res.json(teacherId);
  },
  async findAllTeachers(req, res) {
    const teacherId = [];
    const allTeacherData = await db.teacher.findAll({
      where: { schoolId: req.user.id },
    });
    for (const teacherData of allTeacherData) {
      teacherId.push({
        teacherId: teacherData.dataValues.idSchool,
        name: teacherData.dataValues.name,
      });
    }
    res.json(teacherId);
  },
  async deleteTeacher(req, res) {
    const teacherData = await db.teacher.findOne({
      where: { idSchool: req.params.teacherId },
    });
    if (!teacherData) {
      return res.status(200).json({
        error: "teacher not found",
      });
    }
    if (req.user.id === teacherData.dataValues.schoolId) {
      await db.teacher.destroy({
        where: { idSchool: req.params.teacherId },
      });
      res.status(200).json({
        message: "delete teacher successfully",
      });
    } else {
      res.status(200).json({
        error: "teacher does not belong to your school",
      });
    }
  },
  async editStudent(req, res) {
    const studentData = await db.student.findOne({
      where: { idSchool: req.params.studentId },
    });
    if (!studentData) {
      return res.status(200).json({
        error: "student not found",
      });
    }
    if (req.user.id === studentData.dataValues.schoolId) {
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
      if (data[0] === 1) res.json({ message: "update student successfully" });
      else res.json({ message: "update failed" });
    } else {
      res.status(200).json({
        error: "student does not belong to your school",
      });
    }
  },
  async editSelf(req, res) {
    const data = await db.school.update(
      {
        name: req.body.name,
        province: req.body.province,
        district: req.body.district,
        town: req.body.town,
        street: req.body.street,
        streetNo: req.body.streetNo,
      },
      { where: { id: req.user.id } }
    );
    if (data[0] === 1) res.json({ message: "edit self successfully" });
    else res.json({ message: "edit self failed" });
  },
  async editTimetable(req, res) {
    const classData = await db.class.findOne({
      where: { idSchool: req.body.classId },
    });

    if (!classData) {
      return res.status(200).json({ error: "class not found" });
    }
    if (classData.dataValues.schoolId != req.user.id) {
      return res
        .status(200)
        .json({ error: "class does not belong to your school" });
    }
    const teacherData = await db.teacher.findOne({
      where: { idSchool: req.body.teacherId },
    });
    if (!teacherData) {
      return res.status(200).json({ error: "teacher not found" });
    }
    if (teacherData.dataValues.schoolId != req.user.id) {
      return res
        .status(200)
        .json({ error: "teacher does not belong to your school" });
    }
    const courseData = await db.course.findOne({
      where: { code: req.body.courseCode },
    });
    if (!courseData) {
      return res.status(200).json({ error: "course not found" });
    }
    const days = {
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 7,
    };
    try {
      const data = await db.timetable.update(
        {
          fromWeek: req.body.fromWeek,
          toWeek: req.body.toWeek,
          weekDay: days[req.body.weekDay],
          time: req.body.time,
          classId: classData.dataValues.id,
          courseCode: req.body.courseCode,
          teacherId: teacherData.dataValues.id,
        },
        { where: { id: req.params.timetableId } }
      );
      if (data[0] === 1) res.json({ message: "edit timetable successfully" });
      else res.json({ message: "edit timetable failed" });
    } catch (err) {
      return res.status(200).json({ error: "error occured" });
    }
  },
  async getTimetable(req, res) {
    const days = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday",
    };
    const fullData = [];
    const classData = await db.class.findAll({
      where: { schoolId: req.user.id, academicYearId: req.params.year },
    });
    if (!classData) {
      return res.status(200).json({ error: "data not found" });
    }
    for (const data of classData) {
      if (req.params.week == -1) {
        const timetableData = await db.timetable.findAll({
          where: { classId: data.dataValues.id, toWeek: -1 },
        });
        if (!timetableData) {
          return res.status(200).json({ error: "data not found" });
        }
        for (const temp of timetableData) {
          temp.dataValues.day = days[temp.dataValues.weekDay];
          delete temp.dataValues.weekDay;
          delete temp.dataValues.classId;
          delete temp.dataValues.teacherId;
          delete temp.dataValues.id;
          temp.dataValues.classId = data.dataValues.idSchool;
          temp.dataValues.className = data.dataValues.name;
          fullData.push(temp.dataValues);
        }
      } else {
        const timetableData = await db.timetable.findAll({
          where: { classId: data.dataValues.id },
        });
        for (const temp of timetableData) {
          if (
            temp.dataValues.fromWeek <= req.params.week &&
            (temp.dataValues.toWeek >= req.params.week ||
              temp.dataValues.toWeek == -1) &&
            data.dataValues.academicYearId == req.params.year
          ) {
            temp.dataValues.day = days[temp.dataValues.weekDay];
            const courseData = await db.course.findOne({
              where: { code: temp.dataValues.courseCode },
            });
            temp.dataValues.courseName = courseData.dataValues.name;
            delete temp.dataValues.weekDay;
            delete temp.dataValues.classId;
            delete temp.dataValues.teacherId;
            temp.dataValues.classId = data.dataValues.idSchool;
            temp.dataValues.className = data.dataValues.name;
            fullData.push(temp.dataValues);
          }
        }
      }
    }
    res.send(fullData);
  },
  async deleteTimetable(req, res) {
    const timetableData = await db.timetable.findOne({
      where: { id: req.params.timetableId },
    });
    if (!timetableData) {
      return res.status(200).json({ error: "data not found" });
    }
    const classData = await db.class.findOne({
      where: { id: timetableData.dataValues.classId },
    });
    if (!classData) {
      return res.status(200).json({ error: "data not found" });
    }
    if (req.user.id === classData.dataValues.schoolId) {
      await db.timetable.destroy({
        where: { id: req.params.timetableId },
      });
      res.status(200).json({
        message: "delete timetable successfully",
      });
    } else {
      res.status(200).json({
        error: "timetable does not belong to your school",
      });
    }
  },
  async deleteStudent(req, res) {
    const studentData = await db.student.findOne({
      where: { idSchool: req.params.studentId },
    });
    if (!studentData) {
      return res.status(200).json({ error: "student not found" });
    }
    if (studentData.dataValues.schoolId != req.user.id) {
      return res
        .status(200)
        .json({ error: "student does not belong to your school" });
    }
    await db.student.destroy({
      where: { idSchool: req.params.studentId },
    });
    res.status(200).json({
      message: "delete student successfully",
    });
  },
  async getSelf(req, res) {
    const schoolData = await db.school.findOne({
      where: { id: req.user.id },
    });
    delete schoolData.dataValues.id;
    delete schoolData.dataValues.securitySecret;
    res.send(schoolData.dataValues);
  },
  async changePassword(req, res) {
    const schoolData = await db.school.findOne({
      where: { id: req.user.id },
    });
    if (
      await argon2.verify(schoolData.dataValues.password, req.body.oldPassword)
    ) {
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(req.body.newPassword, {
        salt,
      });
      await db.school
        .update(
          {
            password: hashedPassword,
          },
          {
            where: { id: req.user.id },
          }
        )
        .then((data) => {
          res.json({ message: "updated password" });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.status(400).json({ message: "password does not match" });
    }
  },
};
