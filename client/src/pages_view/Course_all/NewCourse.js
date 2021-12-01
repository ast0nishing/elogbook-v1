/** @format */

/** @format */
// Decoration
import "../Css/newElement.css";
import "../Css/elementForm.css";
import { CSVReader } from "react-papaparse";
// React
import { useContext, useState } from "react";
import { CourseContext } from "../../contexts/CourseContext";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Newcourse() {
  // Contexts
  const { showAddCourseTable, setShowAddCourseTable, addCourse, setShowToast } =
    useContext(CourseContext);

  // State
  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
  });

  const { code, name } = newCourse;

  const onChangeNewCourseForm = (event) =>
    setNewCourse({ ...newCourse, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddCourseData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addCourse(newCourse);
    resetAddCourseData();
    toast("testing");
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetAddCourseData = () => {
    setNewCourse({ name: "", code: "" });
    setShowAddCourseTable(false);
  };

  const papaparseOptions = {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  const handleOnDrop = (data) => {
    var final = [];
    var array = data; // input array
    var codes = []; // unique code for array in course name
    // Get unique course
    array.forEach(function (el) {
      codes.push({ code: el.data.code, name: el.data.name });
    });
    // unique funcction
    const uniqueByKey = (array, key) => {
      return [...new Map(array.map((x) => [x[key], x])).values()];
    };

    var unique = uniqueByKey(codes, "code");
    // Return each lesson respective to each sub json
    unique.forEach(function (uniq) {
      var lessons = [];
      array.forEach(function (el) {
        if (el.data.name == uniq.name) {
          lessons.push({ name: el.data.lessons_name, stt: el.data.lesson_stt });
        }
      });
      final.push({ code: uniq.code, name: uniq.name, lessons });
    });
    console.log(final);
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
        <h1 className="newElementTitle">New School</h1>
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <div className="form-col-25">
              <label>Username</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="fname"
                name="code"
                value={code}
                onChange={onChangeNewCourseForm}
                placeholder="Course code .."
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Password</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="lname"
                name="name"
                value={name}
                onChange={onChangeNewCourseForm}
                placeholder="Course name.."
              ></input>
            </div>
          </div>
          <br></br>
          <div className="form-row">
            <input type="submit" value="Submit" onClick={onSubmit}></input>
          </div>
          <div>
            <ToastContainer />
          </div>
        </form>
        <h1 className="newElementTitle">Import File</h1>
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
      </div>
    </>
  );
}
