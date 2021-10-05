export default function (sequelize, Sequelize) {
  const Timetable = sequelize.define("timetable", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    fromWeek: {
      type: Sequelize.INTEGER(2),
      allowNull: false,
    },
    toWeek: {
      type: Sequelize.INTEGER(2),
      allowNull: false,
      defaultValue: 0,
    },
    weekDay: {
      type: Sequelize.TINYINT(1),
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
  });
  return Timetable;
}
