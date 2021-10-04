export default function (sequelize, Sequelize) {
  const Logbook = sequelize.define("logbook", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    grade: {
      type: Sequelize.INTEGER(3),
      allowNull: false,
    },
    //
    // teacherId: { type: Sequelize.INTEGER, allowNull: false },
    // makeUpLessonId: { type: Sequelize.INTEGER, allowNull: true },
  });
  return Logbook;
}
