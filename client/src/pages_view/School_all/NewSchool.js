/** @format */
// Decoration
import "../Css/newElement.css";
import "../Css/elementForm.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CSVReader } from "react-papaparse";
// React
import { useContext, useState } from "react";
import { SchoolContext } from "../../contexts/SchoolContext";
import React from "react";
import Toast from "react-bootstrap/Toast";
export default function NewSchool() {
  // Contexts
  const {
    schoolState: { school, schools, schoolsLoading },
    getSchools,
    ShowAddSchoolTable,
    setShowAddSchoolTable,
    showToast: { show, message, type },
    setShowToast,
    addSchool,
  } = useContext(SchoolContext);

  // State
  const [newSchool, setNewSchool] = useState({
    username: "",
    password: "",
    name: "",
    id: "",
    role: "school",
    classname: "",
    email: "",
    province: "",
    district: "",
    street: "",
    streeNo: "",
  });

  const {
    username,
    password,
    name,
    province,
    district,
    town,
    street,
    streetNo,
  } = newSchool;

  const onChangeNewSchoolForm = (event) =>
    setNewSchool({ ...newSchool, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddSchoolData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // const { success, message } = await addSchool(newSchool);
    const success = "true";
    const message = "Server error";
    resetAddSchoolData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetAddSchoolData = () => {
    setNewSchool({
      username: "",
      password: "",
      district: "",
      province: "",
      name: "",
    });
    setShowAddSchoolTable(false);
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
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={100000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>

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
                name="username"
                value={username}
                onChange={onChangeNewSchoolForm}
                placeholder="School username.."
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
                name="password"
                value={password}
                onChange={onChangeNewSchoolForm}
                placeholder="School password.."
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>School name</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="lname"
                name="name"
                value={name}
                onChange={onChangeNewSchoolForm}
                placeholder="School name.."
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Province</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="lname"
                name="province"
                value={province}
                onChange={onChangeNewSchoolForm}
                placeholder="Province.."
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>District</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="lname"
                name="district"
                value={district}
                onChange={onChangeNewSchoolForm}
                placeholder="District .."
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Street</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="lname"
                name="street"
                value={street}
                onChange={onChangeNewSchoolForm}
                placeholder="Street.."
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Street Number</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="lname"
                name="streetNo"
                value={streetNo}
                onChange={onChangeNewSchoolForm}
                placeholder="Street Number.."
              ></input>
            </div>
          </div>
          <br></br>
          <div className="form-row">
            <input type="submit" value="Submit"></input>
          </div>
        </form>
        <h1 className="newElementTitle">New School Using Files</h1>
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
