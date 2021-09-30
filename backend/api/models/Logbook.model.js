export default function (sequelize, Sequelize) {
    const Logbook = sequelize.define('lessons', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        date: {
            type: Sequelize.STRING,
            validate: { isDate: true, allowNull: false },
        },
        class_id: { type: Sequelize.INTEGER, allowNull: false },
        gradeId: { type: Sequelize.INTEGER, allowNull: false },
        lessonId: { type: Sequelize.INTEGER, allowNull: false },
        courseId: { type: Sequelize.INTEGER, allowNull: false },
        teacherId: { type: Sequelize.INTEGER, allowNull: false },
        makeUpLessonId: { type: Sequelize.INTEGER, allowNull: true },
        gradeId: { type: Sequelize.INTEGER, allowNull: false },
    });
    return Logbook;
}
