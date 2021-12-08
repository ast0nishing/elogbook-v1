import argon2 from "argon2";
import { randomBytes } from "crypto";

const createStudent = async (db, school, students) => {
  const alreadyExist = [];
  const missingInfo = [];
  const invalidStudentId = [];
  const invalidClassId = [];
  const invalidUsernameSuffix = [];

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
        invalidStudentId.push(student);
        continue;
      }
      // Check for consistent username
      // Ex: idSchool -- LA0102-120001 --> username 120001@LA0102
      const idSchoolarray = student.idSchool.split("-");
      const validUsernameSuffix = `${idSchoolarray[1]}@${idSchoolarray[0]}`;
      const usernameArray = student.username.split(".");
      const usernameSuffix = usernameArray[usernameArray.length - 1];
      if (usernameSuffix !== validUsernameSuffix) {
        console.log(
          `ID ${student.idSchool} does not have a consistent username suffix (studentId@schoolId), please check for typo error`
        );
        invalidUsernameSuffix.push(student);
        continue;
      }

      const studentExist = await db.student.findOne({
        where: { idSchool: student.idSchool },
      });
      if (studentExist) {
        console.log(
          `ID ${student.idSchool} already exists --> cannot create new student ${student.name}`
        );
        alreadyExist.push(student);
        continue;
      }

      const salt = randomBytes(32);
      student.password = await argon2.hash(student.password, {
        salt,
      });
      student.schoolId = school.id;
      // Generate security secret
      student.securitySecret = randomBytes(32).toString("hex");

      console.log(`CREATE NEW STUDENT %s - %s`, student.idSchool, student.name);
      const newStudent = await db.student.create(student);

      if (student.classId) {
        const classExist = await db.class.findOne({
          where: { idSchool: student.classId },
        });
        if (!classExist) {
          invalidClassId.push(student);
        } else {
          console.log(classExist.toJSON());

          await classExist.addStudent(newStudent, {
            through: "class_student",
          });
        }
      }
    }

    const info = {
      missingInfo: missingInfo,
      invalidStudentId: invalidStudentId,
      invalidUsernameSuffix: invalidUsernameSuffix,
      invalidClassId: invalidClassId,
      alreadyExist: alreadyExist,
    };

    return info;
  } catch (err) {
    console.log(err);
  }
};

export default createStudent;
