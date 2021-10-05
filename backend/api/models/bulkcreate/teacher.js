export default async (db) => {
  // const schoolId = "027c13cb-c0eb-4b8d-b4b4-d6d8adc7ed37";
  const teachers = [
    {
      name: "Đường Chí Thành",
      username: "duongchithanh",
      password: "vtn",
      phoneNumber: "0934565533",
      major: "GDCD",
    },
    {
      name: "Thọ Nguyễn",
      username: "nguyentho",
      password: "vtn",
      phoneNumber: "0934567833",
      major: "Toán học",
    },
    {
      name: "Nguyễn Thị B",
      username: "nguyenthib",
      password: "vtn",
      phoneNumber: "0934567833",
      major: "Hóa Học",
    },
    {
      name: "Nguyễn Văn A",
      username: "nguyenvana",
      password: "vtn",
      phoneNumber: "0934567833",
      major: "Vật Lí",
    },
    {
      name: "Lê Văn C",
      username: "levanc",
      password: "vtn",
      phoneNumber: "4409678334",
      major: "Vật Lí",
    },
  ];

  const schoolExist = await db.school.findOne({
    where: { name: "ttu" },
  });
  if (schoolExist) {
    teachers.forEach(async (teacher) => {
      await schoolExist.createTeacher(teacher);
    });
  }
};
