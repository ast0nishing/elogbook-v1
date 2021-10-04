export default function (sequelize, Sequelize) {
  const Class = sequelize.define("class", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(4),
      allowNull: false,
    },
    academicYearId: {
      type: Sequelize.INTEGER(4),
      allowNull: false,
    },
  });
  return Class;
}
