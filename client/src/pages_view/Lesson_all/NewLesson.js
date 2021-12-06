/** @format */

/** @format */
// Decoration
import "../Css/newElement.css";
import "../Css/elementForm.css";
import { CSVReader } from "react-papaparse";
// React
import { useContext, useState } from "react";
import { LessonContext } from "../../contexts/LessonContext";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Newlesson() {
  // Contexts
  const { showAddLessonTable, setShowAddLessonTable, addLesson, setShowToast } =
    useContext(LessonContext);

  // State
  const [newLesson, setNewLesson] = useState({
    code: "",
    name: "",
    lessons: [],
  });

  const { code, name, lessons } = newLesson;

  const onChangeNewLessonForm = (event) =>
    setNewLesson({ ...newLesson, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddLessonData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { message } = await addLesson(newLesson);
    resetAddLessonData();
    toast(message);
    setShowToast({ show: true });
  };

  const resetAddLessonData = () => {
    setNewLesson({ name: "", code: "" });
    setShowAddLessonTable(false);
  };

  const papaparseOptions = {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  const handleOnDrop = (data) => {
    var final = [];
    var array = data; // input array
    var codes = []; // unique code for array in Lesson name
    // Get unique Lesson
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
    setNewLesson(final);
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
        <h1 className="newElementTitle">New Lesson</h1>
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
                onChange={onChangeNewLessonForm}
                placeholder="Lesson code .."
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
                onChange={onChangeNewLessonForm}
                placeholder="Lesson name.."
              ></input>
            </div>
          </div>
          <div>
            <ToastContainer />
          </div>
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
          <br></br>
          <div className="form-row">
            <input type="submit" value="Submit" onClick={onSubmit}></input>
          </div>

          <br></br>
        </form>
      </div>
    </>
  );
}
