export default function (sequelize, Sequelize) {
  const Lesson = sequelize.define("lesson", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    stt: {
      type: Sequelize.TINYINT(2),
      allowNull: false,
    },
  });
  return Lesson;
}
