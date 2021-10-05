export default function (db) {
  // class has many timetable in a academic year
  db.class.hasMany(db.timetable, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.timetable.belongsTo(db.class);

  // classes has many students and versa  M --- N
  // const class_student = sequelize.define(
  //   "class_student",
  //   {},
  //   { timestamps: false }
  // );
  // db.class_student = class_student;

  // db.student.belongsToMany(db.class, { through: db.class_student });
  // db.class.belongsToMany(db.student, { through: db.class_student });
  db.student.belongsToMany(db.class, { through: "class_student" });
  db.class.belongsToMany(db.student, { through: "class_student" });
}
