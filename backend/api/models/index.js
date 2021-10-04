import { default as dbConfig } from "../db.config.js";

import { default as School } from "./School.model.js";

import { default as Teacher } from "./Teacher.model.js";
import { default as Student } from "./Student.model.js";

import { default as Class } from "./Class.model.js";
import { default as Timetable } from "./Timetable.model.js";
import { default as Logbook } from "./Logbook.model.js";

import { default as Lesson } from "./Lesson.model.js";
import { default as Course } from "./Course.model.js";

import { Sequelize } from "sequelize";

export default () => {
  const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
      define: {
        timestamps: false,
        freezeTableName: true,

        // operatorAliases: false,
        // pool: {
        //   max: dbConfig.pool.max,
        //   min: dbConfig.pool.min,
        //   acquire: dbConfig.pool.acquire,
        //   idle: dbConfig.pool.idle,
        // },
      },
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      "Unable to connect to the database:", err;
    });
  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.school = School(sequelize, Sequelize);

  db.teacher = Teacher(sequelize, Sequelize);

  db.student = Student(sequelize, Sequelize);

  db.class = Class(sequelize, Sequelize);

  db.timetable = Timetable(sequelize, Sequelize);

  db.logbook = Logbook(sequelize, Sequelize);

  db.course = Course(sequelize, Sequelize);
  db.lesson = Lesson(sequelize, Sequelize);

  // course has many lessons in it
  db.course.hasMany(db.lesson, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.lesson.belongsTo(db.course);

  // each school has many teachers
  db.school.hasMany(db.teacher, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.teacher.belongsTo(db.school);

  // each school has many classes (seperate each academic year class as a class of school)
  db.school.hasMany(db.class, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.class.belongsTo(db.school);

  // each class has a head teacher (on a academic year)
  db.teacher.hasMany(db.class, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.class.belongsTo(db.teacher);

  // class has many timetable in a academic year (at least two)
  db.class.hasMany(db.timetable, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.timetable.belongsTo(db.class);

  // teacher has many time tables (has many lesson to teach)
  db.teacher.hasMany(db.timetable, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.timetable.belongsTo(db.teacher);

  // each time table has been applied in many logbooks (has in many logbook)
  db.timetable.hasMany(db.logbook, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.logbook.belongsTo(db.timetable);

  // classes has many students and versa  M --- N
  const class_student = sequelize.define(
    "class_student",
    {},
    { timestamps: false }
  );
  db.class_student = class_student;

  db.student.belongsToMany(db.class, { through: db.class_student });
  db.class.belongsToMany(db.student, { through: db.class_student });

  // course appear in  many timetables
  db.course.hasMany(db.timetable, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.timetable.belongsTo(db.course);

  // one lesson are taught in many class (logbook)
  db.lesson.hasMany(db.logbook, {
    foreignKey: {
      allowNull: false,
    },
  });
  db.logbook.belongsTo(db.lesson);

  // sync to database
  db.sequelize.sync();

  return db;
};
