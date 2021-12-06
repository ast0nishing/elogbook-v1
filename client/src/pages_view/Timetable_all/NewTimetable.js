/** @format */
// Decoration
import "../Css/newElement.css";
import "../Css/elementForm.css";
import { CSVReader } from "react-papaparse";
// React
import { useContext, useState } from "react";
import { TimetableContext } from "../../contexts/TimetableContext";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewTimetable() {
  // Contexts
  const { addTimeTable, setShowToast } = useContext(TimetableContext);

  // State
  const [state, setState] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addTimeTable(state);
    toast(message);
    setShowToast({ show: true });
  };

  const papaparseOptions = {
    header: true,
    skipEmptyLines: true,
  };

  const handleOnDrop = (data) => {
    var final = [];
    var final2 = [];
    var array = data; // input array
    var codes = []; // unique code for array in Lesson name

    // unique funcction
    const uniqueByKey = (array, key) => {
      return [...new Map(array.map((x) => [x[key], x])).values()];
    };
    var codes2 = [];
    array.forEach(function (el) {
      codes2.push({
        classId: el.data.classId,
        fromWeek: el.data.fromWeek,
        courseCode: el.data.courseCode,
        teacherId: el.data.teacherId,
      });
    });
    var unique2 = uniqueByKey(codes2, "courseCode");

    // Return each lesson respective to each sub json
    unique2.forEach(function (uniq) {
      var datalist = [];
      array.forEach(function (el) {
        if (el.data.courseCode == uniq.courseCode) {
          datalist.push({
            weekDay: el.data.weekDay,
            time: el.data.time,
          });
        }
      });
      final.push({
        classId: uniq.classId,
        fromWeek: uniq.fromWeek,
        courseCode: uniq.courseCode,
        teacherId: uniq.teacherId,
        blocks: datalist,
      });
    });
    // Uniq 2 time
    final.forEach(function (el) {
      codes.push({
        classId: el.classId,
        fromWeek: el.fromWeek,
      });
    });
    var unique = uniqueByKey(codes, "classId");
    // Return each lesson respective to each sub json
    unique2.forEach(function (uniq) {
      var datalist = [];
      final.forEach(function (el) {
        if (el.classId == uniq.classId) {
          datalist.push({
            courseCode: el.courseCode,
            teacherId: el.teacherId,
            blocks: el.blocks,
          });
        }
      });
      final2.push({
        classId: uniq.classId,
        fromWeek: uniq.fromWeek,
        subjects: datalist,
      });
    });
    console.log(final2);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };
  return (
    <>
      <div className="newElement">
        <h1 className="newElementTitle">New Timetable</h1>
        <form onSubmit={onSubmit}>
          <div>
            <CSVReader
              onDrop={handleOnDrop}
              onError={handleOnError}
              addRemoveButton
              removeButtonColor="#659cef"
              onRemoveFile={handleOnRemoveFile}
              config={papaparseOptions}
            >
              <span>Drop CSV file here or click to upload</span>
            </CSVReader>
          </div>
          <div className="form-row">
            <input type="submit" value="Submit"></input>
          </div>
          <div>
            <ToastContainer />
          </div>
        </form>
      </div>
    </>
  );
}
