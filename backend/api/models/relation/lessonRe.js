export default function (db) {
  // one lesson are taught in many class (logbook)
  db.lesson.hasMany(db.logbook, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.logbook.belongsTo(db.lesson);
}
