/** @format */

/** @format */
// Decoration
import "../Css/newElement.css";
import "../Css/elementForm.css";
import { CSVReader } from "react-papaparse";
// React
import { useContext, useState } from "react";
import { ClassContext } from "../../contexts/ClassContext";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddHeadClassTeacher() {
  // Contexts
  const { addAll, setShowToast } = useContext(ClassContext);
  // State
  const [state, setState] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addAll(state);
    toast(message);
    setShowToast({ show: true });
  };

  const papaparseOptions = {
    header: true,
    skipEmptyLines: true,
  };

  const handleOnDrop = (data) => {
    var array = data; // input array
    var codes = []; // unique code for array in Lesson name
    // Get unique Lesson
    array.forEach(function (el) {
      codes.push({
        idSchool: el.data.idSchool,
        name: el.data.class_name,
        academicYearId: el.data.academicYearId,
        teacherId: el.data.teacherId,
      });
    });
    // unique funcction
    const uniqueByKey = (array, key) => {
      return [...new Map(array.map((x) => [x[key], x])).values()];
    };

    var unique = uniqueByKey(codes, "name");
    // Return each lesson respective to each sub json
    unique.forEach(function (uniq) {
      var datalist = [];
      array.forEach(function (el) {
        if (el.data.class_name == uniq.name) {
          datalist.push({
            idSchool: el.data.Student_school_id,
            name: el.data.name,
            classId: el.data.classId,
            username: el.data.username,
            password: el.data.password,
            phoneNumber: el.data.phoneNumber,
            email: el.data.email,
          });
        }
      });
      setState({
        idSchool: uniq.idSchool,
        name: uniq.name,
        academicYearId: uniq.academicYearId,
        teacherId: uniq.teacherId,
        students: datalist,
      });
    });
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
        <form onSubmit={onSubmit}>
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
          <ToastContainer />
        </form>
      </div>
    </>
  );
}
