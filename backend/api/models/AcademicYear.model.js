export default function (sequelize, Sequelize) {
    const AcademicYear = sequelize.define('academicYears', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        from: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        to: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    return AcademicYear;
}
