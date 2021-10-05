export default function (sequelize, Sequelize) {
  const Logbook = sequelize.define("logbook", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
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
