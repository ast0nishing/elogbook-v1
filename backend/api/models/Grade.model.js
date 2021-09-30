export default function (sequelize, Sequelize) {
    const Grade = sequelize.define('grades', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        score: { type: Sequelize.INTEGER },
        grade: { type: Sequelize.STRING(2) },
    });
    return Grade;
}
