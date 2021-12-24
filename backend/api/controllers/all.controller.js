/** @format */

import { default as db } from "../models/index.js";

export default {
  // find student given studentId
  async getAcademicYears(req, res) {
    const academicYear = await db.class.findAll();
    if (!academicYear) {
      return res.json({ error: "data not found" });
    }
    const returnValue = [];
    for (const data of academicYear) {
      returnValue.push(data.dataValues.academicYearId);
    }
    const uniqueItems = [...new Set(returnValue)].sort();
    res.json(uniqueItems);
  },
  async getClasses(req, res) {
    const classData = await db.class.findAll();
    if (!classData) {
      return res.json({ error: "data not found" });
    }
    const returnValue = [];
    for (const data of classData) {
      returnValue.push([data.dataValues.name, data.dataValues.idSchool]);
    }
    res.json(returnValue);
  },
};
