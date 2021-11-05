import { randomBytes } from "crypto";
import argon2 from "argon2";
import { default as db } from "../models/index.js";
import httpStatus from "http-status";

export default {
  async createSchool(req, res) {
    const alreadyExist = [];
    const missingInfo = [];
    const schools = req.body;
    try {
      for (const school of schools) {
        if (
          !school.idSchool ||
          !school.name ||
          !school.username ||
          !school.password ||
          !school.province ||
          !school.district ||
          !school.town
        ) {
          missingInfo.push(school);
          continue;
        }

        const schoolExist = await db.school.findOne({
          where: { idSchool: school.idSchool },
        });
        if (schoolExist) {
          console.log(
            `ID ${school.idSchool} already exists ---> cannot create ${school.name}`
          );
          alreadyExist.push(school.idSchool);
          continue;
        }
        console.log(`CREATE NEW SCHOOL %s - %s`, school.idSchool, school.name);
        const salt = randomBytes(32);
        school.password = await argon2.hash(school.password, { salt });
        // Generate security secret
        school.securitySecret = randomBytes(32).toString("hex");
        await db.school.create(school);
      }

      if (alreadyExist.length === 0 && missingInfo.length === 0) {
        return res.status(200).json({ msg: "success adding all schools" });
      }

      return res.status(httpStatus.BAD_REQUEST).json({
        "Missing info": missingInfo,
        "IdSchool already exists": alreadyExist,
      });
    } catch (err) {
      console.log(err);
    }
  },
  // async createAdmin(req, res) {
  //     const username = req.body.username;
  //     const password = req.body.password;
  //     try {
  //         if (!username || !password) {
  //             return res
  //                 .status(httpStatus.BAD_REQUEST)
  //                 .json({ msg: 'invalid register' });
  //         }
  //         // const database = await db();
  //         const adminExist = await db.admin.findOne({
  //             where: { username },
  //         });
  //         if (adminExist) {
  //             return res
  //                 .status(httpStatus.BAD_REQUEST)
  //                 .json({ msg: 'Already exist admin account' });
  //         }
  //         // return res.status(200).json({ msg: "ok" });
  //         const salt = randomBytes(32);

  //         await db.admin.create({
  //             username,
  //             password: await argon2.hash(password, { salt }),
  //         });
  //         return res.status(httpStatus.OK).json({ msg: 'success' });
  //     } catch (err) {
  //         console.log(err);
  //     }
  // },

  async createCourse(req, res) {
    console.log(req.user);
    const courses = req.body;
    const alreadyExist = [];

    try {
      for (const course of courses) {
        const courseExist = await db.course.findOne({
          where: { code: course.code },
        });
        if (courseExist) {
          alreadyExist.push(course.code);
          console.log(`Course ${course.code} already exist ---> cannot create`);
          continue;
        }
        console.log(`Get ready to create new course %s`, course.code);
        await db.course.create(course);
      }
      if (alreadyExist.length > 0) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ "Already exist(s) code(s)": alreadyExist });
      }
      return res.status(200).json({ msg: "add all courses success" });
    } catch (err) {
      console.log(err);
    }
  },
  async createLesson(req, res) {
    console.log(req.user);
    const courses = req.body;
    const alreadyExist = [];

    try {
      for (const course of courses) {
        const courseExist = await db.course.findOne({
          where: { code: course.code },
        });
        if (courseExist) {
          alreadyExist.push(course.code);
          console.log(`Course ${course.code} already exist ---> cannot create`);
          continue;
        }
        console.log(`Get ready to create new course %s`, course.code);
        const targetCourse = await db.course.create({
          code: course.code,
          name: course.name,
        });
        const lessons = course.lessons;

        for (const lesson of lessons) {
          await targetCourse.createLesson(lesson);
        }
      }
      if (alreadyExist.length > 0) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ "Already exist(s) code(s)": alreadyExist });
      }
      return res
        .status(200)
        .json({ msg: "add all courses (and lessons) success" });
    } catch (err) {
      console.log(err);
    }
  },
};
