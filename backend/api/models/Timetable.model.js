export default function (sequelize, Sequelize) {
    const Timetable = sequelize.define('timetables', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fromWeek: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        toWeek: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        classId: { type: Sequelize.INTEGER, allowNull: false },
        academicYearId: { type: Sequelize.INTEGER, allowNull: false },
        teacherId: { type: Sequelize.INTEGER, allowNull: false },
        courseId: { type: Sequelize.INTEGER, allowNull: false },
        periodId: { type: Sequelize.INTEGER, allowNull: false },
        weekDayId: { type: Sequelize.INTEGER, allowNull: false },
    });
    return Timetable;
}
