export default async (db) => {
  const classes = [
    {
      idSchool: "LA0102-C15004",
      name: "7A9",
      academicYearId: 2015,
      teacherId: "",
    },
    {
      idSchool: "LA0102-C17014",
      name: "9A9",
      academicYearId: 2017,
      teacherId: "",
    },
    {
      idSchool: "LA0102-C19005",

      name: "8A1",
      academicYearId: 2019,
      teacherId: "",
    },
    {
      idSchool: "LA0102-C20006",

      name: "8A2",
      academicYearId: 2020,
      teacherId: "",
    },
    {
      idSchool: "LA0102-C14007",
      name: "8A5",
      academicYearId: 2014,
      teacherId: "",
    },
    {
      idSchool: "LA0102-C19001",
      name: "SE19",
      academicYearId: 2019,
      teacherId: "",
    },
  ];
  const teacherId = "LA0102-T12001";
  const teacherName = "Cao Tiến Dũng";
  // const teacherId = "LA0102-T19020";
  // const teacherName = "Đường Chí Thành";
  const schoolId = "LA0102";

  await db.school
    .findOne({
      where: { idSchool: schoolId },
    })
    .then(async (schoolExist) => {
      if (!schoolExist) {
        return console.log(`CANNOT FIND SCHOOL ${schoolId}`);
      } else {
        await schoolExist
          .getTeachers({ where: { idSchool: teacherId, name: teacherName } })
          .then(async (teacherExist) => {
            if (JSON.stringify(teacherExist) === JSON.stringify([])) {
              return console.log(
                `CANNOT FIND TEACHER ${(teacherId, teacherName)}`
              );
            } else {
              classes.forEach(async (eachClass) => {
                await schoolExist
                  .getClasses({ where: { idSchool: eachClass.idSchool } })
                  .then(async (classExist) => {
                    if (JSON.stringify(classExist) === JSON.stringify([])) {
                      eachClass.teacherId = teacherExist[0].id;
                      console.log(
                        `GET READY TO CREATE CLASS ${
                          (eachClass.idSchool,
                          eachClass.name,
                          eachClass.academicYearId)
                        }`
                      );
                      await schoolExist.createClass(eachClass);
                    } else {
                      console.log(
                        `CLASS ID ${
                          eachClass.idSchool
                        } ALREADY EXISTS --> cannot create class ${
                          (eachClass.name, eachClass.academicYearId)
                        }`
                      );
                    }
                  });
              });
            }
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // if (schoolExist) {
  //   const teacherExist = await schoolExist.getTeachers({
  //     where: { idSchool: "LA0102-T19020", name: "Đường Chí Thành" },
  //   });
  //   // console.log(`actually here`);
  //   // console.log(teacherExist);
  //   // console.log(teacherExist.toJSON());
  //   if (
  //     !(JSON.stringify(teacherExist) === JSON.stringify([])) &&
  //     teacherExist.length() == 1
  //   ) {
  //     console.log("reach here");
  //     const teacher = teacherExist[0];
  //     classes.forEach(async (a_class) => {
  //       const classExist = await schoolExist.getClasses({
  //         where: { idSchool: a_class.idSchool },
  //       });
  //       if (JSON.stringify(classExist) === JSON.stringify([])) {
  //         a_class.teacherId = teacher.id;
  //         await schoolExist.createClass(a_class);
  //       } else {
  //         console.log(
  //           `ID ${a_class.idSchool} already exists --> cannot create class ${a_class.name}`
  //         );
  //       }
  //     });
  //   }
  // }
};
