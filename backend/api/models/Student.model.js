export default function (sequelize, Sequelize) {
    const Student = sequelize.define('students', {
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
        school_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        class_id: { type: Sequelize.INTEGER },
    });
    return Student;
}
