export default function (sequelize, Sequelize) {
    const HeadTeacher = sequelize.define('headTeachers', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING, allowNull: false },
        classId: { type: Sequelize.STRING, allowNull: false },
        academicYearId: { type: Sequelize.STRING, allowNull: false },
    });
    return HeadTeacher;
}
