// import bcrypt from 'bcrypt';

import { DataTypes } from "sequelize/types";

export default function (sequelize) {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      validate: {
        isIn: [["0", "1", "2"]], // 0: Admin -- 1: Teacher -- 2: Student
      },
    },
  });

  return User;
}
