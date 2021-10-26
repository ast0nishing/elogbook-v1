// bulk create
import { default as schoolData } from './school.js';
import { default as teacherData } from './teacher.js';
import { default as classData } from './class.js';
import { default as studentData } from './student.js';
import { default as lessonData } from './lesson.js';
import { default as courseData } from './course.js';

export default async (db) => {
    const schools = schoolData();
    const teachers = teacherData();
    const classes = classData();
    const students = studentData();
    const courses = courseData();
    const lessons = lessonData();

    const schoolID = 'LA0102';
    const teacherID = 'LA0102-T12001';
    const classID = 'LA0102-C19001';
    const courseID = 'SE19CS311';

    try {
        // Create Course
        for (const course of courses) {
            const courseExist = await db.course.findOne({
                where: { code: course.code },
            });
            if (courseExist) {
                console.log(
                    `Course ${course.code} already exist ---> cannot create`
                );
                continue;
            }
            console.log(`Get ready to create new course %s`, course.code);
            await db.course.create(course);
        }

        // create lesson
        const targetCourse = await db.course.findOne({
            where: { code: courseID },
        });
        const existedLessons = await targetCourse.getLessons();
        if (existedLessons.length > 0) {
            for (const lesson of existedLessons) {
                await lesson.destroy();
            }
        }
        for (const lesson of lessons) {
            await targetCourse.createLesson(lesson);
        }

        // Create School
        for (const school of schools) {
            const schoolExist = await db.school.findOne({
                where: { idSchool: school.idSchool },
            });

            if (schoolExist) {
                console.log(
                    `ID ${school.idSchool} already exists ---> cannot create ${school.name}`
                );
                continue;
            }

            console.log(
                `CREATE NEW SCHOOL %s - %s`,
                school.idSchool,
                school.name
            );
            await db.school.create(school);
        }

        const targetSchool = await db.school.findOne({
            where: { idSchool: schoolID },
        });
        console.log(targetSchool.toJSON());

        // Create Teacher
        for (const teacher of teachers) {
            const teacherExist = await targetSchool.getTeachers({
                where: { idSchool: teacher.idSchool },
            });

            if (teacherExist.length > 0) {
                console.log(
                    `ID ${teacher.idSchool} already exists --> cannot create new teacher ${teacher.name}`
                );
                continue;
            }

            console.log(
                `CREATE NEW TEACHER %s - %s`,
                teacher.idSchool,
                teacher.name
            );
            await targetSchool.createTeacher(teacher);
        }

        const targetTeacher = await db.teacher.findOne({
            where: { idSchool: teacherID },
        });
        console.log(targetTeacher.toJSON());

        // Creat Classes
        for (const eachClass of classes) {
            const classExist = await targetSchool.getClasses({
                where: { idSchool: eachClass.idSchool },
            });
            if (classExist.length > 0) {
                console.log(
                    `CLASS ID ${eachClass.idSchool} ALREADY EXISTS --> cannot create class ${eachClass.name} ${eachClass.academicYearId}`
                );
                continue;
            }
            console.log(
                `GET READY TO CREATE CLASS %s - %s - %s`,
                eachClass.idSchool,
                eachClass.name,
                eachClass.academicYearId
            );
            await targetSchool.createClass(eachClass);
        }

        // Create Student
        const targetClass = await db.class.findOne({
            where: { idSchool: classID },
        });
        await targetClass.setTeacher(targetTeacher.id);
        console.log(targetClass.toJSON());

        for (const student of students) {
            const studentExist = await db.student.findOne({
                where: { idSchool: student.idSchool },
            });
            if (studentExist) {
                console.log(
                    `Student ID already exist --> cannot create student %s, %s`,
                    student.idSchool,
                    student.name
                );
                continue;
            }
            console.log(
                `get ready to create new student %s - %s`,
                student.idSchool,
                student.name
            );
            await targetClass.createStudent(student);
        }

        //
    } catch (err) {
        console.log(err);
    }
};
