// This function is for admin only

export default async (school, db) => {
  await db.school.create(school);
  console.log(school.toJSON());
};
// username format: sa@schoolshortname
