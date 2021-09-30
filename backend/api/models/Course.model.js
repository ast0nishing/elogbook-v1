export default function (sequelize, Sequelize) {
    const Course = sequelize.define('courses', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    return Course;
}
