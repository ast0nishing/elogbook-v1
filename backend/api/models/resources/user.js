export default function (sequalize, Sequalize) {
    const User = sequalize.define('users', {
        username: {
            type: Sequalize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        password: { type: Sequalize.STRING, allowNull: false },
        role: { type: Sequalize.INTEGER, allowNull: false },
    });
    return User;
}
