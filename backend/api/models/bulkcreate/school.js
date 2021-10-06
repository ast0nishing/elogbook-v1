export default async (db) => {
  // await db.school.bulkCreate()
  const schools = [
    {
      idSchool: "LA0102",
      name: "ttu",
      username: "sa@LA0102",
      password: "vtn",

      province: "Long An",
      district: "Đức Hòa",
      town: "Đức Hòa",
    },
    {
      idSchool: "LA1002",
      name: "tts",
      username: "sa@LA1002",
      password: "vtn",

      province: "Long An",
      district: "Đức Hòa",
      town: "Đức Hòa",
    },
    {
      idSchool: "LA0105",
      name: "thpt đức hòa",
      username: "sa@LA0105",
      password: "vtn",

      province: "Long An",
      district: "Đức Huệ",
      town: "Đức Hòa Hạ",
    },
    {
      idSchool: "SG0102",
      name: "Võ Văn Tần",
      username: "sa@SG0102",
      password: "vtn",

      province: "Long An",
      district: "Đức Hòa",
      town: "Đức Hòa Thượng",
    },
    {
      idSchool: "LA0302",
      name: "Hậu Nghĩa",
      username: "sa@LA0302",
      password: "vtn",

      province: "Long An",
      district: "Đức Hòa",
      town: "Đức Hòa Đông",
    },
  ];

  console.log(`BEFORE`);
  schools.forEach(async (school) => {
    console.log(`BEFORE`);
    await db.school
      .findOne({
        where: { idSchool: school.idSchool },
      })
      .then(async (schoolExist) => {
        if (!schoolExist) {
          console.log(`CREATE NEW SCHOOL ${(school.idSchool, school.name)}`);
          await db.school.create(school);
        } else {
          console.log(
            `ID ${school.idSchool} already exists ---> cannot create ${school.name}`
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(`AFTER`);
  });

  //   if (!schoolExist) {
  //     db.school.create(school);
  //   } else {
  //     console.log(
  //       `ID ${school.idSchool} already exist ==> cannot create school ${school.name}`
  //     );
  //   }
};
