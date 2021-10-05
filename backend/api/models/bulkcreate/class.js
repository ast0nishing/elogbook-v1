export default async (db) => {
  const classes = [
    {
      name: "7A9",
      academicYearId: 2015,
      teacherId: "",
    },
    {
      name: "9A9",
      academicYearId: 2017,
      teacherId: "",
    },
    {
      name: "8A1",
      academicYearId: 2019,
      teacherId: "",
    },
    {
      name: "8A2",
      academicYearId: 2020,
      teacherId: "",
    },
    {
      name: "8A5",
      academicYearId: 2014,
      teacherId: "",
    },
  ];

  const schoolExist = await db.school.findOne({
    where: { name: "ttu" },
  });

  if (schoolExist) {
    const teachers = await schoolExist.getTeachers({
      where: { username: "levanc" },
    });
    if (!Object.is(teachers, [])) {
      const teacher = teachers[0];

      classes.forEach(async (a_class) => {
        a_class.teacherId = teacher.id;
        console.log(a_class.teacherId);
        await schoolExist.createClass(a_class);
      });
    }
  }
};
