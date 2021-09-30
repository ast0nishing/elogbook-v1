export default function (sequelize, Sequelize) {
    const Period = sequelize.define('periods', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fromTime: { type: Sequelize.STRING },
        toTime: { type: Sequelize.STRING },
    });
    return Period;
}
