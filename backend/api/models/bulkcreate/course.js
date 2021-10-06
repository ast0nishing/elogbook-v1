export default async (db) => {
  const courses = [
    {
      code: "SE19CS311",
      name: "Introduction to Database",
    },
    {
      code: "CB19VATLI09",
      name: "Vật Lí 09",
    },
    {
      code: "CB17HINHHOC06",
      name: "Hình Học 09",
    },
    {
      code: "NC18NGUVAN10",
      name: "Ngữ Văn 10 - NC",
    },
    {
      code: "CB21GDCD11",
      name: "GDCD 11",
    },
    {
      code: "NCSINHHOC12",
      name: "Sinh Học 12 - NC",
    },
  ];

  courses.forEach(async (course) => {
    await db.course
      .findOne({ where: { code: course.code } })
      .then(async (courseExist) => {
        if (courseExist) {
          console.log(`COURSE ${(course.code, course.name)} ALREADY EXIST`);
        } else {
          console.log(
            `GET READY TO CREATE NEW COURSE ${(course.code, course.name)}`
          );
          db.course.create(course);
        }
      });
  });

  // console.log(`BEFORE`);
  // schools.forEach(async (school) => {
  //   console.log(`BEFORE`);
  //   await db.school
  //     .findOne({
  //       where: { idSchool: school.idSchool },
  //     })
  //     .then(async (schoolExist) => {
  //       if (!schoolExist) {
  //         console.log(`CREATE NEW SCHOOL ${(school.idSchool, school.name)}`);
  //         await db.school.create(school);
  //       } else {
  //         console.log(
  //           `ID ${school.idSchool} already exists ---> cannot create ${school.name}`
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });
};
