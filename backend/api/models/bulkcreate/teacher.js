export default async (db) => {
  // const schoolId = "027c13cb-c0eb-4b8d-b4b4-d6d8adc7ed37";
  const teachers = [
    {
      idSchool: "LA0102-T12001",
      username: "dung.cao.t12001@LA0102",
      password: "vtn",

      name: "Cao Tiến Dũng",
      major: "KHMT",
      phoneNumber: "0000111122",
      email: "dung.cao@gmail.com",
    },
    {
      idSchool: "LA0102-T19020",
      username: "thanh.duong.t19020@LA0102",
      password: "vtn",

      name: "Đường Chí Thành",
      major: "GDCD",
      phoneNumber: "0934565533",
      email: "duongchithanh@gmail.com",
    },
    {
      idSchool: "LA0102-T19021",
      username: "tho.nguyen.t19021@LA0102",
      password: "vtn",

      name: "Thọ Nguyễn",
      phoneNumber: "0934567833",
      major: "Toán học",
      email: "nguyentho@gmail.com",
    },
    {
      idSchool: "LA0102-T19022",
      username: "b.nguyen.t19022@LA0102",
      password: "vtn",

      name: "Nguyễn Thị B",
      phoneNumber: "0934567833",
      major: "Hóa Học",
      email: "nguyenthib@gmail.com",
    },
    {
      idSchool: "LA0102-T19023",
      username: "a.nguyen.t19023@LA0102",
      password: "vtn",
      name: "Nguyễn Văn A",

      phoneNumber: "0934567833",
      major: "Vật Lí",
      email: "nguyenvana@gmail.com",
    },
    {
      idSchool: "LA0102-T19024",
      username: "c.le.t19024@LA0102",
      password: "vtn",
      name: "Lê Văn C",

      phoneNumber: "4409678334",
      major: "Vật Lí",
      email: "levanc@gmail.com",
    },
  ];

  const schoolId = "LA0102";

  await db.school
    .findOne({
      where: { idSchool: schoolId },
    })
    .then((schoolExist) => {
      console.log(`CHECK BEFORE`);

      if (schoolExist) {
        teachers.forEach(async (teacher) => {
          await schoolExist
            .getTeachers({ where: { idSchool: teacher.idSchool } })
            .then(async (teacherExist) => {
              if (JSON.stringify(teacherExist) === JSON.stringify([])) {
                console.log(
                  `CREATE NEW TEACHER ${(teacher.idSchool, teacher.name)}`
                );
                await schoolExist.createTeacher(teacher);
              } else {
                console.log(`---- adf -----`);
                console.log(
                  `ID ${teacher.idSchool} already exists --> cannot create new teacher ${teacher.name}`
                );
              }
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(`CHECK AFTER`);
  // db.school.findOne

  // if (schoolExist) {
  //     if (JSON.stringify(teachers) === JSON.stringify([])) {
  //       await schoolExist.createTeacher(teacher);
  //     } else {
  //       console.log(teacherExist);
  //       console.log(
  //         `ID ${teacher.idSchool} already exists --> cannot create new teacher ${teacher.name}`
  //       );
  //     }
  //   });
  // }
};
