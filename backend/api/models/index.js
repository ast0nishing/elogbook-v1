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
    logging: false,
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

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

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

// After create table, comment out this line
// await db.sequelize.sync({ force: true });

// // fake data
// await createData(db);
export default db;
