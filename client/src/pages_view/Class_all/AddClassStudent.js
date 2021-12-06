/** @format */
// Decoration
import "../Css/newElement.css";
import "../Css/elementForm.css";
import { CSVReader } from "react-papaparse";
// React
import { useContext, useState } from "react";
import { StudentContext } from "../../contexts/StudentContext";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddClassStudent() {
  // Contexts
  const {
    showAddStudentTable,
    setShowStudentTable,
    addClassStudent,
    setShowToast,
  } = useContext(StudentContext);

  // State
  const [state, setState] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addClassStudent(state);
    toast(message);
    setShowToast({ show: true });
  };

  const papaparseOptions = {
    header: true,
    skipEmptyLines: true,
  };

  const handleOnDrop = (data) => {
    var final = [];
    var array = data; // input array
    var codes = []; // unique code for array in Lesson name
    // Get unique Lesson
    array.forEach(function (el) {
      codes.push({ idSchool: el.data.idSchool, name: el.data.class_name });
    });
    // unique funcction
    const uniqueByKey = (array, key) => {
      return [...new Map(array.map((x) => [x[key], x])).values()];
    };

    var unique = uniqueByKey(codes, "idSchool");
    // Return each lesson respective to each sub json
    unique.forEach(function (uniq) {
      var datalist = [];
      array.forEach(function (el) {
        if (el.data.idSchool == uniq.idSchool) {
          datalist.push({
            idSchool: el.data.Student_school_id,
            name: el.data.student_name,
          });
        }
      });
      final.push({
        idSchool: uniq.idSchool,
        name: uniq.name,
        students: datalist,
      });
    });
    setState(final);
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
        <h1 className="newElementTitle">Import File</h1>
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
          <br></br>
          <div className="form-row">
            <input type="submit" value="Submit" onClick={onSubmit}></input>
          </div>
          <div>
            <ToastContainer />
          </div>
        </form>
      </div>
    </>
  );
}
