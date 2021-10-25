import { default as timeTableData } from "./timetable.js";
import { default as logbookData } from "./logbook.js";
export default async (db) => {
  const timeTables = timeTableData();
  const logbooks = logbookData();
  //
  const classID = "LA0102-C19001";
  const teacherID = "LA0102-T12001";
  const courseCode = "SE19CS311";

  const targetTeacher = await db.teacher.findOne({
    where: { idSchool: teacherID },
  });
  const targetCourse = await db.course.findOne({ where: { code: courseCode } });
  const targetClass = await db.class.findOne({ where: { idSchool: classID } });

  for (const timetable of timeTables) {
    timetable.courseCode = targetCourse.code;
    timetable.classId = targetClass.id;
    timetable.teacherId = targetTeacher.id;
    const timetableExist = await db.timetable.findOne({ where: timetable });
    if (timetableExist) {
      console.log(`timetable below already exists`);
      console.log(timetableExist.toJSON());
      continue;
    }
    console.log(`getting ready to create new timetable`);
    await db.timetable.create(timetable);
  }

  const targetLessons = await targetCourse.getLessons();

  console.log(targetClass.toJSON());
  const allTimeTable = await targetClass.getTimetables();

  for (
    let i = 0;
    i < Math.min(logbooks.length, allTimeTable.length, targetLessons.length);
    i++
  ) {
    logbooks[i].timetableId = allTimeTable[i].id;
    logbooks[i].lessonId = targetLessons[i].id;
    const logbookExist = await db.logbook.findOne({ where: logbooks[i] });
    if (logbookExist) {
      console.log(`This logbook already exist`);
      console.log(logbookExist.toJSON());
      continue;
    }
    console.log(`get ready to create logbook`);
    await db.logbook.create(logbooks[i]);
  }
};
