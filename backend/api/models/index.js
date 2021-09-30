import { default as dbConfig } from '../db.config.js';
import { default as User } from './User.model.js';
import { default as School } from './School.model.js';
import { default as Timetable } from './Timetable.model.js';
import { default as Teacher } from './Teacher.model.js';
import { default as Student } from './Student.model.js';
import { default as Class } from './Class.model.js';
import { default as AcademicYear } from './AcademicYear.model.js';
import { default as Logbook } from './Logbook.model.js';
import { default as Lesson } from './Lesson.model.js';
import { default as Absent } from './Absent.model.js';
import { default as Grade } from './Grade.model.js';
import { default as HeadTeacher } from './HeadTeacher.model.js';
import { default as Period } from './Period.model.js';
import { default as Course } from './Course.model.js';

import { Sequelize } from 'sequelize';
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
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        'Unable to connect to the database:', err;
    });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.absents = Absent(sequelize, Sequelize);
db.academicYears = AcademicYear(sequelize, Sequelize);
db.classes = Class(sequelize, Sequelize);
db.courses = Course(sequelize, Sequelize);
db.grades = Grade(sequelize, Sequelize);
db.headTeachers = HeadTeacher(sequelize, Sequelize);
db.lessons = Lesson(sequelize, Sequelize);
db.logbooks = Logbook(sequelize, Sequelize);
db.periods = Period(sequelize, Sequelize);
db.schools = School(sequelize, Sequelize);
db.students = Student(sequelize, Sequelize);
db.teachers = Teacher(sequelize, Sequelize);
db.timetables = Timetable(sequelize, Sequelize);
db.users = User(sequelize, Sequelize);

export default db;
