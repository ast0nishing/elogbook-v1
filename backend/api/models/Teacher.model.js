export default function (sequelize, Sequelize) {
    const Teacher = sequelize.define('teachers', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING, allowNull: false },
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
        major: { type: Sequelize.STRING },
        school_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    return Teacher;
}
