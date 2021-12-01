/** @format */
// Decoration
import "../Css/newElement.css";
import "../Css/elementForm.css";
import { CSVReader } from "react-papaparse";
// React
import { useContext, useState } from "react";
import { SchoolContext } from "../../contexts/SchoolContext";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  // Add one school
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

  const createschools = [];
  // Add schools in array
  const { idSchool, username, password, name, province, district, town } =
    newSchool;

  const onChangeNewSchoolForm = (event) =>
    setNewSchool({ ...newSchool, [event.target.name]: event.target.value });
  // Submit function
  const onSubmit = async (event) => {
    event.preventDefault();
    const { message } = await addSchool(newSchool);
    setShowToast({ show: true });
    toast(message);
    console.log(message);
  };

  const papaparseOptions = {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  const handleOnDrop = (data) => {
    const codes = []; // unique code for array in course name
    // Get new schools
    data.forEach(function (el) {
      codes.push({
        idSchool: el.data.idschool,
        name: el.data.name,
        username: el.data.username,
        password: el.data.password,
        province: el.data.province,
        town: el.data.town,
        district: el.data.district,
      });
    });
    setNewSchool(codes);
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
              <label>idSchool</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="fname"
                name="idSchool"
                value={idSchool}
                onChange={onChangeNewSchoolForm}
                placeholder="idSchool.."
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
              <label>Town</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="lname"
                name="town"
                value={town}
                onChange={onChangeNewSchoolForm}
                placeholder="Town .."
              ></input>
            </div>
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
            <input type="submit" value="Submit" onSubmit={onSubmit}></input>
          </div>
          <div>
            <ToastContainer />
          </div>
        </form>
      </div>
    </>
  );
}
