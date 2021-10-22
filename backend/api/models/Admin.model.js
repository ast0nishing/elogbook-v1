export default function (sequelize, Sequelize) {
    const Admin = sequelize.define('admin', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.TINYINT(1),
            allowNull: false,
            defaultValue: 0,
        },
        Null: false,
    });
    return Admin;
}
