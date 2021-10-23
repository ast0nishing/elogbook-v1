export default function (db) {
    // each school has many teachers
    db.school.hasMany(db.teacher, {
        foreignKey: {
            allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    db.teacher.belongsTo(db.school);

    // each school has many students
    db.school.hasMany(db.student, {
        foreignKey: {
            allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    db.teacher.belongsTo(db.school);
    // each school has many classes (seperate each academic year class as a class of school)
    db.school.hasMany(db.class, {
        foreignKey: {
            allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    db.class.belongsTo(db.school);
}
