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

export default function NewClass() {
  // Contexts
  const { showAddClassTable, setShowAddClassTable, addClass, setShowToast } =
    useContext(ClassContext);

  // State
  const [newClass, setNewClass] = useState([
    {
      idSchool: "",
      name: "",
      academicYearId: "",
    },
  ]);

  const { idSchool, name, academicYearId } = newClass;

  const onChangeNewClassForm = (event) =>
    setNewClass({ ...newClass, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddClassData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addClass(newClass);
    resetAddClassData();
    toast(message);
    setShowToast({ show: true });
  };

  const resetAddClassData = () => {
    setNewClass({ idSchool: "", name: "", academicYearId: "" });
    setShowAddClassTable(false);
  };

  const papaparseOptions = {
    header: true,
    skipEmptyLines: true,
  };

  const handleOnDrop = (data) => {
    var codes = []; // unique code for array in course name
    // Get unique course
    data.forEach(function (el) {
      codes.push(el.data);
    });
    setNewClass(codes);
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
        <h1 className="newElementTitle">New Class</h1>
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <div className="form-col-25">
              <label>School id</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="fname"
                name="idSchool"
                value={idSchool}
                onChange={onChangeNewClassForm}
                placeholder="School id .."
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Class</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="lname"
                name="name"
                required
                value={name}
                onChange={onChangeNewClassForm}
                placeholder="Class name.."
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Academic year</label>
            </div>
            <div className="form-col-75">
              <input
                required
                type="text"
                id="lname"
                name="academicYearId"
                value={academicYearId}
                onChange={onChangeNewClassForm}
                placeholder="Academic year.."
              ></input>
            </div>
          </div>
          <br></br>
          <div className="form-row">
            <input type="submit" value="Submit"></input>
          </div>
          <div>
            <ToastContainer />
          </div>
        </form>
        <div>
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
            <div className="form-row">
              <input type="submit" value="Submit"></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
