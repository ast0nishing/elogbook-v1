export default async (db) => {
  // const school = db.school;

  await db.school.bulkCreate([
    {
      name: "ttu",
      username: "ttu123",
      password: "vtn",

      province: "Long An",
      district: "Đức Hòa",
      town: "Đức Hòa",
    },
    {
      name: "tts",
      username: "tts123",
      password: "vtn",

      province: "Long An",
      district: "Đức Hòa",
      town: "Đức Hòa",
    },
    {
      name: "thpt đức hòa",
      username: "thptduchoa",
      password: "vtn",

      province: "Long An",
      district: "Đức Huệ",
      town: "Đức Hòa Hạ",
    },
    {
      name: "Võ Văn Tần",
      username: "vovantan123",
      password: "vtn",

      province: "Long An",
      district: "Đức Hòa",
      town: "Đức Hòa Thượng",
    },
    {
      name: "Hậu Nghĩa",
      username: "haunghia123",
      password: "vtn",

      province: "Long An",
      district: "Đức Hòa",
      town: "Đức Hòa Đông",
    },
  ]);
  console.log("create 5 schools including Tân Tạo");
};
