/** @format */
import "../Css/newElement.css";
import "../Css/elementForm.css";
import { CSVReader } from "react-papaparse";
// React
import { useContext, useState } from "react";
import { StudentContext } from "../../contexts/StudentContext";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewStudent() {
  // Contexts
  const {
    showAddStudentTable,
    setShowAddStudentTable,
    addStudent,
    setShowToast,
  } = useContext(StudentContext);

  // State
  const [newStudent, setNewStudent] = useState([
    {
      username: "",
      password: "",
      name: "",
      phoneNumber: "",
      school: "",
      id: "",
      role: "student",
      classname: "",
      email: "",
      adress: "",
    },
  ]);

  const { username, password, name, phoneNumber, school, email } = newStudent;

  const onChangeNewStudentForm = (event) =>
    setNewStudent({ ...newStudent, [event.target.name]: event.target.value });

  // const closeDialog = () => {
  //   resetAddStudentData();
  // };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addStudent(newStudent);
    resetAddStudentData();
    toast(message);
    setShowToast({ show: true });
  };

  const resetAddStudentData = () => {
    setNewStudent({
      username: "",
      password: "",
      name: "",
      phoneNumber: "",
      school: "",
      id: "",
      role: "student",
      classname: "",
      email: "",
      adress: "",
    });
    setShowAddStudentTable(false);
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
    setNewStudent(codes);
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
        <h1 className="newElementTitle">New Student</h1>
        <form onSubmit={onSubmit}>
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
                onChange={onChangeNewStudentForm}
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
                onChange={onChangeNewStudentForm}
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
                id="lname"
                name="name"
                value={name}
                onChange={onChangeNewStudentForm}
                placeholder="name.."
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
                id="lname"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChangeNewStudentForm}
                placeholder="Phone.."
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>School</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="lname"
                name="school"
                value={school}
                onChange={onChangeNewStudentForm}
                placeholder="school.."
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
                onChange={onChangeNewStudentForm}
                placeholder="Email.."
              ></input>
            </div>
          </div>
          <br></br>
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
          <div className="form-row">
            <input type="submit" value="Submit"></input>
          </div>
        </form>
      </div>
    </>
  );
}
