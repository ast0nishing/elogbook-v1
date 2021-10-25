export default function (db) {
  // course has many lessons in it

  db.course.hasMany(db.lesson, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.lesson.belongsTo(db.course);

  // course appear in  many timetables
  db.course.hasMany(db.timetable, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.timetable.belongsTo(db.course);
}
