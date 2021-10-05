export default function (db) {
  // time table has many logbook (has appeared in many logbook)
  db.timetable.hasMany(db.logbook, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.logbook.belongsTo(db.timetable);
}
