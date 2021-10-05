export default function (db) {
  // course has many lessons in it

  db.course.hasMany(db.lesson, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.lesson.belongsTo(db.course);

  // course appear in  many timetables
  db.course.hasMany(db.timetable, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.timetable.belongsTo(db.course);
}
