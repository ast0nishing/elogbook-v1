/** @format */

import { PermIdentity, Publish } from "@material-ui/icons";
import "../Css/newElement.css";
import "../Css/elementForm.css";
import "../Css/element.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { StudentContext } from "../../contexts/StudentContext";
import { useContext, useEffect } from "react";
import { SchoolContext } from "../../contexts/SchoolContext";

export default function Student() {
  // Contexts
  const {
    studentState: { student, students },
    setShowToast,
    getStudents,
    showToast: { show, message, type },
  } = useContext(StudentContext);
  const { updateStudent } = useContext(SchoolContext);
  // State
  const [updatedState, setUpdatedState] = useState(student);

  // useEffect(() => setUpdatedState(student), [students]);

  const { name, address, phoneNumber, email } = updatedState;

  const onChangeUpdatedForm = (event) =>
    setUpdatedState({
      ...updatedState,
      [event.target.name]: event.target.value,
    });

  // Context
  const history = useHistory();
  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const { message, success } = await updateStudent(updatedState);
      if (message) {
        setShowToast({ show: true, message, type: null });
        toast(message);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        getStudents({ name: "9A9", year: 2019 });
        history.push("/students");
      }
    } catch (error) {}
  };
  return (
    <div className="newElement">
      <h1 className="newElementTitle">Edit student Information</h1>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-col-25">
            <label>Student Name</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="fname"
              name="name"
              value={name}
              onChange={onChangeUpdatedForm}
              placeholder={student.name}
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label> Phone Number</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChangeUpdatedForm}
              placeholder={student.phoneNumber}
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label> Email</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="email"
              value={email}
              onChange={onChangeUpdatedForm}
              placeholder={student.email}
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label> Address</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="address"
              value={address}
              onChange={onChangeUpdatedForm}
              placeholder={student.address}
            ></input>
          </div>
        </div>
        <br></br>
        <div className="form-row">
          <input type="submit" value="Submit"></input>
        </div>
        <div>
          <ToastContainer
            show={show}
            style={{ position: "top-left", top: "10%", right: "5%" }}
            className={`bg-danger text-white`}
            onClose={setShowToast.bind(this, {
              show: false,
              message: "",
              type: null,
            })}
            delay={3000}
            autohide
          />
        </div>
      </form>
    </div>
  );
}
