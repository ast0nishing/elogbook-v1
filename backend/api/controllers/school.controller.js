import { default as db } from "../models/index.js";
const database = db();

export default {
  async createTeacher(req, res) {
    const alreadyExist = [];

    const missingInfo = [];
    const teachers = req.body;

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

        const teacherExist = await database.teacher.findOne({
          where: { idSchool: school.idSchool },
        });
        if (teacherExist) {
          console.log(
            `ID ${school.idSchool} already exists ---> cannot create ${school.name}`
          );
          alreadyExist.push(school.idSchool);
          continue;
        }
        const salt = randomBytes(32);
        school.password = await argon2.hash(school.password, { salt });

        console.log(`CREATE NEW SCHOOL %s - %s`, school.idSchool, school.name);

        await database.school.create(school);
      }
      if (alreadyExist.length === 0 && missingInfo.length === 0) {
        return res
          .status(httpStatus.OK)
          .json({ msg: "Add all school success" });
      }

      return res.status(httpStatus.OK).json({
        "Already exist(s) idSchool(s)": alreadyExist,
        "Missing primary information (7 fields in total)": missingInfo,
      });
    } catch (err) {
      console.log(err);
    }
  },
  async createClass(req, res) {},
  async createStudent(req, res) {},

  async findAll(req, res) {},
  async findOne(req, res) {},
  async update(req, res) {},
  async delete(req, res) {},
};
