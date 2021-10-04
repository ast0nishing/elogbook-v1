export default function (sequelize, Sequelize) {
  const Lesson = sequelize.define("lesson", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Lesson;
}
