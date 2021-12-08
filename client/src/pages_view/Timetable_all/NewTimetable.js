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
    var codes = []; // unique code for array in course name
    var timetables = [];
    data.forEach(function (el) {
      codes.push(el.data);
    });
    // Get class
    var week = codes[0]["Week"];
    var classes = Object.keys(codes[0]).slice(3, Object.keys(codes[0]).length);
    classes.forEach(function (el) {
      var timetable = [];
      codes.forEach(function (ele) {
        var subjects = {
          blocks: [{ weekDay: ele.Day, time: ele.Time }],
          courseCode: ele[el].split(":")[0],
          teacherId: ele[el].split(":")[1],
        };
        timetable.push(subjects);
      });

      timetables.push({ classId: el, fromWeek: week, subjects: timetable });
    });
    console.log(timetables);
    setState(timetables);
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
