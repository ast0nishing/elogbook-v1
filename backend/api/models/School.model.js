export default function (sequelize, Sequelize) {
  const School = sequelize.define("school", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    idSchool: {
      type: Sequelize.STRING(7),
      unique: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING(10),
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.TINYINT(1),
      allowNull: false,
      defaultValue: 1,
    },
    province: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    district: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    town: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    street: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    streetNo: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  });
  return School;
}
