export default function (sequelize, Sequelize) {
  const Course = sequelize.define("course", {
    // id: {
    //   type: Sequelize.UUID,
    //   defaultValue: Sequelize.UUIDV4,
    // },
    // course id: sample VATLI0820, HOAHOC1021, GDCD1020
    code: {
      type: Sequelize.STRING(20),
      allowNull: false,
      primaryKey: true,
      // unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Course;
}
