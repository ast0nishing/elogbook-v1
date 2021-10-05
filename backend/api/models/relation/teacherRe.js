export default function (db) {
  // teacher has many time tables
  db.teacher.hasMany(db.timetable, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.timetable.belongsTo(db.teacher);

  // each class has a head teacher (on a academic year) -- teacher has a head teacher
  db.teacher.hasMany(db.class, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.class.belongsTo(db.teacher);
}
