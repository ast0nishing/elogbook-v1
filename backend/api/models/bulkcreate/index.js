// bulk create
import { default as createSchool } from "./school.js";
import { default as createTeacher } from "./teacher.js";
import { default as createClass } from "./class.js";
import { default as createStudent } from "./student.js";
import { default as createCourse } from "./course.js";
import { default as createLesson } from "./lesson.js";
import { default as classAddStudent } from "./classAddStudent.js";

export default async (db) => {
  // bulk create
  // await createSchool(db)
  //   .then(async (ab) => await createTeacher(db))
  //   .then(async (adf) => {
  //     await createClass(db);
  //   })

  //   .then(async (afd) => {
  //     await createStudent(db);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // // create
  // createSchool(db)
  // createTeacher(db);
  // createClass(db);
  // createStudent(db);
  // createCourse(db);
  createLesson(db);

  // add students to new class/ modify class
  // classAddStudent(db);

  const targetSchool = "LA0102";
  const targetTeacher = "LA0102-T12001";

  // // Delete teacher ---
  // await db.school
  //   .findOne({
  //     where: { idSchool: targetSchool },
  //   })
  //   .then(async (schoolExist) => {
  //     if (!schoolExist) {
  //       console.log(`CANNOT FIND SCHOOL ${targetSchool}`);
  //     } else {
  //       await schoolExist
  //         .getTeachers({ where: { idSchool: targetTeacher } })
  //         .then(async (teachers) => {
  //           if (JSON.stringify(teachers) === JSON.stringify([])) {
  //             console.log(`CANNOT FIND TEACHER ${targetTeacher}`);
  //           } else {
  //             teachers.forEach(async (teacher) => {
  //               await teacher.destroy();
  //             });
  //           }
  //         });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // const targetSchool2 = "SG0102";
  //   // delete school
  //   db.school
  //     .findOne({ where: { idSchool: targetSchool2 } })
  //     .then(async (school) => {
  //       if (school) {
  //         console.log(
  //           `ready to destroy school ${(school.idSchool, school.name)}`
  //         );
  //         await school.destroy();
  //       } else {
  //         console.log(`cannot find school ${(school.idSchool, school.name)}`);
  //       }
  //     });

  // // delete all Classes
  // await db.school
  //   .findOne({ where: { idSchool: targetSchool } })
  //   .then(async (schoolExist) => {
  //     if (!schoolExist) {
  //       console.log(`CANNOT FIND SCHOOL ${targetSchool}`);
  //     } else {
  //       await schoolExist.getClasses().then((classes) => {
  //         if (classes.length != 0) {
  //           classes.forEach(async (eachClass) => {
  //             await eachClass.destroy();
  //           });
  //         } else {
  //           console.log(`THERE ARE NO CLASSES IN SCHOOL ${targetSchool}`);
  //         }
  //       });
  //     }
  //   });

  // delete all student from a class
};
