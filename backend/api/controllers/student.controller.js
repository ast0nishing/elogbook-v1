import { default as db } from '../models/index.js';
import jwt from 'jsonwebtoken';
import { default as config } from '../config/auth.config.js';

export default {
    async findClassStudents(req, res) {
        const token = req.headers['x-access-token'];
        jwt.verify(token, config.secret, (err, decoded) => {
            req.userId = decoded.id;
        });
        const studentData = await db.student.findOne({
            include: [{ model: db.class, though: 'class_student' }],
            where: { id: req.userId },
        });
        if (studentData.dataValues.classes.length === 0) {
            return res.json({
                message: 'Student does not belong to any class',
            });
        }
        const studentClassId =
            studentData.dataValues.classes.pop().dataValues.id;
        const classData = await db.class.findOne({
            include: [{ model: db.student, though: 'class_student' }],
            where: { id: studentClassId },
        });
        const teacherData = await db.teacher.findOne({
            where: { id: classData.dataValues.teacherId },
        });
        const schoolData = await db.school.findOne({
            where: { id: classData.dataValues.schoolId },
        });
        const studentNames = [];
        for (const student of classData.dataValues.students) {
            studentNames.push({
                id: student.dataValues.id,
                name: student.dataValues.name,
            });
        }
        const fullData = {
            schoolId: schoolData.dataValues.idSchool,
            schoolName: schoolData.dataValues.name,
            className: classData.dataValues.name,
            teacherName: teacherData.dataValues.name,
            students: studentNames,
        };
        res.json(fullData);
    },

    async findOneStudent(req, res) {
        const studentData = await db.student.findOne({
            where: { id: req.params.studentId },
        });

        const schoolData = await db.school.findOne({
            where: { id: studentData.dataValues.schoolId },
        });
        studentData.dataValues.schoolName = schoolData.dataValues.name;
        delete studentData.dataValues.password;
        delete studentData.dataValues.schoolId;
        delete studentData.dataValues.id;
        res.send(studentData);
    },
};
