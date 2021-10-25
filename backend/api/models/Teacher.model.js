export default function (sequelize, Sequelize) {
  const Teacher = sequelize.define("teacher", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    idSchool: {
      type: Sequelize.STRING(14),
      allowNull: false,
      unique: true,
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
      defaultValue: 2,
    },
    name: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    major: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    dob: {
      type: Sequelize.DATEONLY,
      validate: {
        isDate: true,
      },
    },
  });

  return Teacher;
}
