export default function (sequelize, Sequelize) {
  const Course = sequelize.define("course", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    // grade: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    // }, // index
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Course;
}
