export default function (db) {
  // teacher has many time tables
  db.teacher.hasMany(db.timetable, {
    // foreignKey: {
    //   allowNull: true,
    // },

    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
  db.timetable.belongsTo(db.teacher);

  // each class has a head teacher (on a academic year) -- teacher has a head teacher
  db.teacher.hasMany(db.class, {
    foreignKey: {
      allowNull: true,
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
  db.class.belongsTo(db.teacher);
}
