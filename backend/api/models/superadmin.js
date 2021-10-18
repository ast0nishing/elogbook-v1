export default function (sequelize, Sequelize) {
  const Admin = sequelize.define("admin", {
    username: {
      type: Sequelize.STRING(20),
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
      defaultValue: 0,
    },
  });
  return Admin;
}
