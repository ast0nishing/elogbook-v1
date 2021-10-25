<<<<<<< HEAD
export default function (sequalize, Sequalize) {
  const Student = sequalize.define("student", {
    id: { type: Sequalize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequalize.STRING, allowNull: false },
    address: { type: Sequalize.STRING },
    phoneNumber: { type: Sequalize.INTEGER },
    email: { type: Sequalize.STRING },
=======
export default function (sequelize, Sequelize) {
  const Student = sequelize.define("student", {
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
      defaultValue: 3,
    },
    name: {
      type: Sequelize.STRING(64),
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
>>>>>>> 389c7cd0faca020fa9ccf63e2cc6c3764f549c74
  });
  return Student;
}
