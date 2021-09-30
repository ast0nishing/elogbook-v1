import bcrypt from 'bcrypt';

export default function (sequelize, Sequelize) {
    const User = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER(8).ZEROFILL,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING(64),
            allowNull: false,
            // set(value) {
            //     const hash = bcrypt.hashSync(value, 10);
            //     this.setDataValue('password', hash);
            // },
        },
        role: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isIn: [['0', '1', '2']], // 0: Admin -- 1: Teacher -- 2: Student
            },
        },
    });
    return User;
}
