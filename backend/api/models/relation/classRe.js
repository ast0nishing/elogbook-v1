export default function (db) {
  // class has many timetable in a academic year
  db.class.hasMany(db.timetable, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.timetable.belongsTo(db.class);

  // classes has many students and versa  M --- N
  db.student.belongsToMany(db.class, {
    through: "class_student",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.class.belongsToMany(db.student, {
    through: "class_student",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
}
