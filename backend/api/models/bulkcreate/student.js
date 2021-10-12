export default () => {
  const students = [
    {
      idSchool: "LA0102-190102",
      username: "nguyen.vuong.190102@LA0102",
      password: "vtn",

      name: "Vương Thảo Nguyên",
      phoneNumber: "0934565533",
      email: "nguyen.vuong1902060@gmail.com",
    },
    {
      idSchool: "LA0102-190202",
      username: "thai.le.190202@LA0102",
      password: "vtn",

      name: "Lê Quang Thái",
      phoneNumber: "0934567833",
      email: "thaileisme@gmail.com",
    },
    {
      idSchool: "LA0102-190203",
      username: "ktuyt.190203@LA0102",
      password: "vtn",

      name: "K'tuyt",
      phoneNumber: "0934567833",
      email: "ktuyt@gmail.com",
    },
    {
      idSchool: "LA0102-180204",
      username: "giang.nguyen.180204@LA0102",
      password: "vtn",

      name: "Nguyễn Tấn Thanh Giang",
      phoneNumber: "0934567833",
      email: "nguyen.giang@gmail.com",
    },
    {
      idSchool: "LA0102-190205",
      username: "hoang.dao.190205@LA0102",
      password: "vtn",

      name: "Đào Văn Ngọc Hoàng",
      phoneNumber: "4409678334",
      email: "hoang.dao@gmail.com",
    },
    {
      idSchool: "LA0102-190206",
      username: "tuan.tran.190206@LA0102",
      password: "vtn",

      name: "Trần Triệu Tuân",
      phoneNumber: "4409678334",
      email: "tuan.tran@gmail.com",
    },
    {
      idSchool: "LA0102-190207",
      username: "vu.tran.190207@LA0102",
      password: "vtn",

      name: "Châu Hoài Vũ",
      phoneNumber: "4409678334",
      email: "levanc@gmail.com",
    },
    {
      idSchool: "LA0102-190208",
      username: "nam.nguyen.190208@LA0102",
      password: "vtn",

      name: "Nguyễn Đức Nam",
      phoneNumber: "4409678334",
      email: "levanc@gmail.com",
    },
  ];
  return students;

  // const schoolId = "LA0102";
  // const classId = "LA0102-C19001";
  // const className = "SE19";

  // db.school
  //   .findOne({ where: { idSchool: schoolId } })
  //   .then(async (schoolExist) => {
  //     if (!schoolExist) {
  //       return console.log(`CANNOT FIND SCHOOL ${schoolId}`);
  //     } else {
  //       await schoolExist
  //         .getClasses({ where: { idSchool: classId, name: className } })
  //         .then((classExist) => {
  //           if (JSON.stringify(classExist) === JSON.stringify([])) {
  //             return console.log(`CANNOT FIND CLASS ${(classId, className)}`);
  //           } else {
  //             students.forEach(async (student) => {
  //               const targetClass = classExist[0];
  //               await targetClass
  //                 .getStudents({ where: { idSchool: student.idSchool } })
  //                 .then(async (studentExist) => {
  //                   if (JSON.stringify(studentExist) != JSON.stringify([])) {
  //                     console.log(
  //                       `STUDENT ID ${student.idSchool} ALREADY EXIST --> CANNOT CREATE NEW STUDENT ${student.name}`
  //                     );
  //                   } else {
  //                     await targetClass.createStudent(student);
  //                   }
  //                 });
  //             });
  //           }
  //         });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
