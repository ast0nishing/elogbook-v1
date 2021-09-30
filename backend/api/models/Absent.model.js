export default function (sequelize, Sequelize) {
    const Absent = sequelize.define('absents', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        studentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        lessonId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        date: {
            type: Sequelize.INTEGER,
            validate: { isDate: true },
            allowNull: false,
        },
    });
    return Absent;
}
