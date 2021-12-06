/** @format */

/** @format */
// Decoration
import "../Css/newElement.css";
import "../Css/elementForm.css";
import { CSVReader } from "react-papaparse";
// React
import { useContext, useState } from "react";
import { TeacherContext } from "../../contexts/TeacherContext";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddClassTeacher() {
  // Contexts
  const {
    showAddTeacherTable,
    setShowTeacherTable,
    addClassTeachers,
    setShowToast,
  } = useContext(TeacherContext);

  // State
  const [newTeacher, setNewTeacher] = useState([
    {
      idSchool: "",
      name: "",
      teacherId: "",
      teacherName: "",
    },
  ]);

  const { idSchool, name, teacherId, teacherName } = newTeacher;

  const onChangeNewTeacherForm = (event) =>
    setNewTeacher({ ...newTeacher, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addClassTeachers(newTeacher);
    toast(message);
    setShowToast({ show: true });
  };

  const papaparseOptions = {
    header: true,
    skipEmptyLines: true,
  };

  const handleOnDrop = (data) => {
    const codes = []; // unique code for array in course name
    // Get new schools
    data.forEach(function (el) {
      codes.push(el.data);
    });
    setNewTeacher(codes);
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
        <h1 className="newElementTitle">Add Teacher to Class</h1>
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <div className="form-col-25">
              <label>idSchool</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="fname"
                name="idSchool"
                value={idSchool}
                onChange={onChangeNewTeacherForm}
                placeholder="idSchool .."
                code
                Teacher
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Name</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="fname"
                name="name"
                value={name}
                onChange={onChangeNewTeacherForm}
                placeholder="Username .."
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Teacher ID</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="fname"
                name="teacherId"
                value={teacherId}
                onChange={onChangeNewTeacherForm}
                placeholder="Teacher ID .."
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
        <br></br>
        <div className="form-row">
          <input type="submit" value="Submit" onClick={onSubmit}></input>
        </div>
      </div>
    </>
  );
}
