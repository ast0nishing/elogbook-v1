export default function (sequelize, Sequelize) {
  const Course = sequelize.define("course", {
    // id: {
    //   type: Sequelize.UUID,
    //   defaultValue: Sequelize.UUIDV4,
    //   primaryKey: true,
    // },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Course;
}
