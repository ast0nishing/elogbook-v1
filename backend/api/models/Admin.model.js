export default function (sequelize, Sequelize) {
    const Admin = sequelize.define('admins', {
        name: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        address: { type: Sequelize.STRING, allowNull: true },
        phoneNumber: { type: Sequelize.INTEGER },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isEmail: true,
            },
        },
        dob: {
            type: Sequelize.STRING,
            validate: {
                isDate: true,
            },
        },
        school_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        class_id: { type: Sequelize.INTEGER },
    });
    return Admin;
}
