export default function (db) {
  // each school has many teachers
  db.school.hasMany(db.teacher, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.teacher.belongsTo(db.school);

  // each school has many classes (seperate each academic year class as a class of school)
  db.school.hasMany(db.class, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.class.belongsTo(db.school);
}
