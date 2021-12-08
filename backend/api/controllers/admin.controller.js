import { randomBytes } from "crypto";
import argon2 from "argon2";
import { default as db } from "../models/index.js";
import httpStatus from "http-status";
import { default as config } from "../configs/authConfig.js";

export default {
  async createAdmin(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const key = req.body.key;
    if (key !== config.adminKey) {
      return res.status(httpStatus.BAD_REQUEST).json({ msg: "wrong key" });
    }
    try {
      if (!username || !password) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ msg: "invalid register" });
      }
      // const database = await db();
      const adminExist = await db.admin.findOne({
        where: { username },
      });
      if (adminExist) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ msg: "Already exist admin account" });
      }
      // return res.status(200).json({ msg: "ok" });
      const salt = randomBytes(32);

      await db.admin.create({
        username,
        password: await argon2.hash(password, { salt }),
      });
      return res.status(httpStatus.OK).json({ msg: "success" });
    } catch (err) {
      console.log(err);
    }
  },
  async createSchool(req, res) {
    const schools = req.body;

    const alreadyExist = [];
    const missingInfo = [];
    const invalidUsername = [];
    const invalidIdSchool = [];
    const invalidAddressLength = [];

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
        if (school.username.length > 10) {
          invalidUsername.push(school);
          continue;
        }
        if (school.idSchool.length > 7) {
          invalidIdSchool.push(school);
          continue;
        }
        if (
          school.province.length > 20 ||
          school.district.length > 64 ||
          school.town.length > 64
        ) {
          invalidAddressLength.push(school);
        }

        const schoolExist = await db.school.findOne({
          where: { idSchool: school.idSchool },
        });
        if (schoolExist) {
          console.log(
            `ID ${school.idSchool} already exists ---> cannot create ${school.name}`
          );
          alreadyExist.push(school);
          continue;
        }
        console.log(`CREATE NEW SCHOOL %s - %s`, school.idSchool, school.name);
        const salt = randomBytes(32);
        school.password = await argon2.hash(school.password, { salt });
        // Generate security secret
        school.securitySecret = randomBytes(32).toString("hex");
        await db.school.create(school);
      }

      if (
        alreadyExist.length === 0 &&
        missingInfo.length === 0 &&
        invalidIdSchool.length === 0 &&
        invalidUsername.length === 0 &&
        invalidAddressLength.length == 0
      ) {
        return res.status(200).json({ msg: "success adding all schools" });
      }

      return res.status(httpStatus.BAD_REQUEST).json({
        "Missing info": missingInfo,
        "IdSchool already exists": alreadyExist,
        "Invalid ID School length (6 or 7)": invalidIdSchool,
        "Invalid username length (9 or 10)": invalidUsername,
        "Invalid Address field length": invalidAddressLength,
      });
    } catch (err) {
      console.log(err);
    }
  },

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
          console.log(`Course ${course.code} already exist ---> cannot create`);
          alreadyExist.push(course);
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
    const courses = req.body;

    const alreadyExist = [];

    try {
      for (const course of courses) {
        const courseExist = await db.course.findOne({
          where: { code: course.code },
        });
        if (courseExist) {
          console.log(`Course ${course.code} already exist ---> cannot create`);
          alreadyExist.push(course);
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
        .json({ msg: "add all courses and their lessons success" });
    } catch (err) {
      console.log(err);
    }
  },
  async getCourses(req, res) {
    const allCourses = await db.course.findAll();
    const result = [];
    for (const data of allCourses) {
      result.push(data.dataValues);
    }
    res.send(result);
  },
  async getCourse(req, res) {
    const course = await db.course.findOne({
      where: { code: req.params.code },
    });
    if (course === null) return res.json({ error: "course not found." });
    res.send(course.dataValues);
  },
  async updateCourse(req, res) {
    const success = await db.course.update(
      {
        code: req.body.code,
        name: req.body.name,
      },
      {
        where: { code: req.params.code },
      }
    );
    if (success[0] === 1) res.json({ message: "updates course successfully" });
    else res.json({ message: "update failed" });
  },
  async deleteCourse(req, res) {
    const success = await db.course.destroy({
      where: { code: req.params.code },
    });

    if (success === 1) res.json({ message: "delete course successfully" });
    else res.json({ message: "failed" });
  },
};
