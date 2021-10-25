<<<<<<< HEAD
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
=======
import { default as dbConfig } from '../config/db.config.js';
import { Sequelize } from 'sequelize';
import { default as classRe } from './relation/classRe.js';
import { default as courseRe } from './relation/courseRe.js';
import { default as lessonRe } from './relation/lessonRe.js';
import { default as schoolRe } from './relation/schoolRe.js';
import { default as teacherRe } from './relation/teacherRe.js';
import { default as timetableRe } from './relation/timetableRe.js';

import { default as Admin } from './superadmin.js';
import { default as School } from './School.model.js';
import { default as Teacher } from './Teacher.model.js';
import { default as Student } from './Student.model.js';

import { default as Class } from './Class.model.js';
import { default as Logbook } from './Logbook.model.js';
import { default as Timetable } from './Timetable.model.js';

import { default as Lesson } from './Lesson.model.js';
import { default as Course } from './Course.model.js';

import { default as createData } from './bulkcreate/index.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
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
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });
>>>>>>> 389c7cd0faca020fa9ccf63e2cc6c3764f549c74

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
<<<<<<< HEAD
<<<<<<< HEAD

User(sequelize, Sequelize);
Student(sequelize, Sequelize);

console.log("avblasdkj");

const { user, student } = sequelize.models;

student.hasOne(user);
user.belongsTo(student);
=======
db.academicYears = AcademicYear(sequelize, Sequelize);
db.class = Class(sequelize, Sequelize);
db.lessons = Lesson(sequelize, Sequelize);
db.logbooks = Logbook(sequelize, Sequelize);
db.schools = School(sequelize, Sequelize);
db.students = Student(sequelize, Sequelize);
db.teachers = Teacher(sequelize, Sequelize);
db.timetables = Timetable(sequelize, Sequelize);
db.users = User(sequelize, Sequelize);
>>>>>>> 660115b9c083f8b29ad5757dedcf91bead1c976f
=======

// create tables
db.admin = Admin(sequelize, Sequelize);
db.school = School(sequelize, Sequelize);
db.teacher = Teacher(sequelize, Sequelize);
db.student = Student(sequelize, Sequelize);

db.class = Class(sequelize, Sequelize);
db.timetable = Timetable(sequelize, Sequelize);
db.logbook = Logbook(sequelize, Sequelize);

db.course = Course(sequelize, Sequelize);
db.lesson = Lesson(sequelize, Sequelize);

// create relation
classRe(db);
courseRe(db);
lessonRe(db);
schoolRe(db);
teacherRe(db);
timetableRe(db);
>>>>>>> 389c7cd0faca020fa9ccf63e2cc6c3764f549c74

// // fake data
// await createData(db);
export default db;
