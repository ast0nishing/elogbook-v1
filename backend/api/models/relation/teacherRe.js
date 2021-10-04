// teacher has many time tables
db.teacher.hasMany(db.timetable, {
  foreignKey: {
    allowNull: false,
  },
});
db.timetable.belongsTo(db.teacher);

// each class has a head teacher (on a academic year) -- teacher has a head teacher
db.teacher.hasMany(db.class, {
  foreignKey: {
    allowNull: false,
  },
});
db.class.belongsTo(db.teacher);
