import { default as dbConfig } from "../db.config.js";

// import { default as createRelation } from "./relationship.cjs";

import { default as User } from "./User.js";
import { default as School } from "./School.js";
import { default as Timetable } from "./Timetable.js";
import { default as Teacher } from "./Teacher.js";
import { default as Student } from "./Student.js";
import { default as Class } from "./Class.js";
import { default as AcademicYear } from "./AcademicYear.js";
import { default as Logbook } from "./Logbook.js";

import { Sequelize } from "sequelize";
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

await sequelize
  .authenticate()
  .then(() => {
    sequelize.sync();

    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    "Unable to connect to the database:", err;
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

User(sequelize, Sequelize);
Student(sequelize, Sequelize);

console.log("avblasdkj");

const { user, student } = sequelize.models;

student.hasOne(user);
user.belongsTo(student);

export default db;
