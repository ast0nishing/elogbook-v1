import { randomBytes } from "crypto";

export default function (sequelize, Sequelize) {
  const Admin = sequelize.define("admin", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING(20),
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING(5),
      allowNull: false,
      defaultValue: "admin",
    },
    securitySecret: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: randomBytes(32).toString("hex"),
    },
  });
  return Admin;
}
