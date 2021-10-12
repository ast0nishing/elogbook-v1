// import { default as classAddStudent } from "./classAddStudent.js";
import { default as bulkCreate } from "./bulkCreate.js";
import { default as logbookRelated } from "./bulkTTLogbook.js";
export default async (db) => {
  await bulkCreate(db);
  await logbookRelated(db);

  //
  // add students to new class/ modify class
  // classAddStudent(db);
  // const targetSchool = "LA0102";
  // const targetTeacher = "LA0102-T12001";
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
