// time table has many logbook (has appeared in many logbook)
db.timetable.hasMany(db.logbook, {
  foreignKey: {
    allowNull: false,
  },
});
db.logbook.belongsTo(db.timetable);
