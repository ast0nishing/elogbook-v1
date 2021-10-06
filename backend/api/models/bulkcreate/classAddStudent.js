export default async (db) => {
  const students = [
    {
      idSchool: "LA0102-190202",
      name: " Vương Thảo Nguyên",
    },
    {
      idSchool: "LA0102-190202",
      name: "Lê Quang Thái",
    },
    {
      idSchool: "LA0102-190203",
      name: "K'tuyt",
    },
    {
      idSchool: "LA0102-180204",
      name: "Nguyễn Tấn Thanh Giang",
    },
    {
      idSchool: "LA0102-190205",
      name: "Đào Văn Ngọc Hoàng",
    },
    {
      idSchool: "LA0102-190206",
      name: "Trần Triệu Tuân",
    },
    {
      idSchool: "LA0102-190207",
      name: "Châu Hoài Vũ",
    },
    {
      idSchool: "LA0102-190208",
      name: "Nguyễn Đức Nam",
    },
  ];

  const targetSchool = "LA0102";
  const targetClassId = "LA0102-C19001";
  const targetClassName = "SE19";

  await db.school
    .findOne({ where: { idSchool: targetSchool } })
    .then(async (schoolExist) => {
      if (!schoolExist) {
        console.log(`CANNOT FIND SCHOOL ${targetSchool}`);
      } else {
        await schoolExist
          .getClasses({
            where: { idSchool: targetClassId, name: targetClassName },
          })
          .then((foundClass) => {
            if (JSON.stringify(foundClass) === JSON.stringify([])) {
              console.log(
                `CANNOT FIND CLASS ${(targetClassId, targetClassName)}`
              );
            } else {
              // const foundClass = foundClass[0];
              students.forEach(async (student) => {
                await db.student
                  .findOne({
                    where: { idSchool: student.idSchool, name: student.name },
                  })
                  .then(async (studentExist) => {
                    if (!studentExist) {
                      console.log(
                        `STUDENT ${
                          (student.idSchool, student.name)
                        } DOES NOT EXISTS`
                      );
                    } else {
                      if (!student.idSchool.includes(targetSchool)) {
                        console.log(
                          `THIS STUDENT ${
                            (student.idSchool, student.name)
                          } DOES NOT BELONG TO YOUR SCHOOL --> YOU DON'T HAVE THE AUTHORIZATION TO ADD HIS/HER TO ANY CLASS`
                        );
                      } else {
                        const targetClass = foundClass[0];
                        await targetClass
                          .hasStudent(studentExist)
                          .then(async (aldreadyIn) => {
                            if (aldreadyIn) {
                              console.log(
                                `STUDENT ${
                                  (student.idSchool, student.name)
                                } ALREADY IN CLASS ${
                                  (targetClassId, targetClassName)
                                } `
                              );
                            } else
                              console.log(
                                `GETTING READY TO ADD STUDENT ${
                                  (student.idSchool, student.name)
                                } TO THE CLASS ${
                                  (targetClassId, targetClassName)
                                }`
                              );
                            await targetClass.addStudent(studentExist, {
                              through: "class_student",
                            });
                          });
                      }
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
};
