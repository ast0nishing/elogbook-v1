export default function (sequelize, Sequelize) {
    const School = sequelize.define('schools', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING, allowNull: false },
        province: { type: Sequelize.STRING, allowNull: false },
        district: { type: Sequelize.STRING, allowNull: false },
        town: { type: Sequelize.STRING, allowNull: false },
        street: { type: Sequelize.STRING, allowNull: true },
        streetNo: { type: Sequelize.INTEGER, allowNull: true },
        adminId: { type: Sequelize.INTEGER, allowNUll: false },
    });
    return School;
}
