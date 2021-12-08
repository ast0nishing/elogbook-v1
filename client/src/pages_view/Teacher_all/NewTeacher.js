/** @format */

/** @format */
// Decoration
import "../Css/newElement.css";
import "../Css/elementForm.css";
import { CSVReader } from "react-papaparse";
import Spinner from "react-bootstrap/Spinner";
// React
import { useContext, useState } from "react";
import { TeacherContext } from "../../contexts/TeacherContext";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router";
import "react-toastify/dist/ReactToastify.css";

export default function NewTeacher() {
  // Contexts
  const {
    showAddTeacherTable,
    setShowTeacherTable,
    addTeachers,
    addClassTeachers,
    setShowToast,
    getTeachers,
  } = useContext(TeacherContext);

  // State
  const [newTeacher, setNewTeacher] = useState([
    {
      idSchool: "",
      username: "",
      password: "",
      name: "",
      major: "",
      phoneNumber: "",
      email: "",
    },
  ]);

  const history = useHistory();
  const { idSchool, username, password, name, major, phoneNumber, email } =
    newTeacher;

  const onChangeNewTeacherForm = (event) =>
    setNewTeacher({ ...newTeacher, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addTeachers(newTeacher);
    toast(message);
    setShowToast({ show: true });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    getTeachers();
    history.push("/teachers");
  };

  const papaparseOptions = {
    header: true,
    skipEmptyLines: true,
  };

  const handleOnDrop = (data) => {
    const codes = []; // unique code for array in teachers
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
        <h1 className="newElementTitle">New Teacher</h1>
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
              <label>Username</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="fname"
                name="username"
                value={username}
                onChange={onChangeNewTeacherForm}
                placeholder="Username .."
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
                id="fname"
                name="password"
                value={password}
                onChange={onChangeNewTeacherForm}
                placeholder="Password .."
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
                placeholder="Teacher Name .."
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Phone</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="fname"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChangeNewTeacherForm}
                placeholder="Phone number .."
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Major</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="fname"
                name="major"
                value={major}
                onChange={onChangeNewTeacherForm}
                placeholder="Major .."
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Email</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="lname"
                name="email"
                value={email}
                onChange={onChangeNewTeacherForm}
                placeholder="Email .."
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
          <input type="submit" value="Submit" onClick={onSubmit}></input>
        </div>
      </div>
    </>
  );
}
