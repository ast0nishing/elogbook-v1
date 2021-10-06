export default async (db) => {
  const lessons = [
    {
      name: "Introduction to Database",
      stt: 1,
    },
    {
      name: "Relational Model",
      stt: 2,
    },
    {
      name: "Design Database",
      stt: 3,
    },
    {
      name: "Design Database (cont)",
      stt: 4,
    },
    {
      name: "Design Theory",
      stt: 5,
    },
    {
      name: "Design Theory (cont)",
      stt: 6,
    },
    {
      name: "Using SQL (1)",
      stt: 7,
    },
    {
      name: "Using SQL (2)",
      stt: 8,
    },
    {
      name: "Using SQL (3)",
      stt: 9,
    },
    {
      name: "Using SQL (4)",
      stt: 10,
    },
  ];

  const course = {
    code: "SE19CS311",
    name: "Introduction to Database",
  };

  // console.log();

  await db.course
    .findOne({ where: { code: course.code, name: course.name } })
    .then((courseExist) => {
      if (!courseExist) {
        console.log(`COURSE ${(course.code, course.name)} DOES NOT EXIST`);
      } else {
        lessons.forEach(async (lesson) => {
          await courseExist.createLesson(lesson).then((lesson) => {
            console.log(lesson.toJSON());
          });
        });
      }
    });
};
