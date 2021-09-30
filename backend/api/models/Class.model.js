export default function (sequelize, Sequelize) {
    const Class = sequelize.define('classes', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        schoolId: { type: Sequelize.INTEGER, allowNull: false },
        academicYearId: { type: Sequelize.INTEGER, allowNull: false },
        headTeacherId: { type: Sequelize.INTEGER, allowNull: false },
    });
    return Class;
}
