export default function (sequelize, Sequelize) {
  const Logbook = sequelize.define("logbook", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    week: {
      type: Sequelize.INTEGER(2),
      allowNull: false,
    },
    grade: {
      type: Sequelize.INTEGER(3),
      allowNull: false,
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    note: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  });
  return Logbook;
}
