/** @format */

import { PermIdentity, Publish } from "@material-ui/icons";
import "../Css/newElement.css";
import "../Css/elementForm.css";
import "../Css/element.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { TeacherContext } from "../../contexts/TeacherContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { SchoolContext } from "../../contexts/SchoolContext";

export default function Teacher() {
  // Contexts
  const {
    getTeachers,
    teacherState: { teacher, teachers },
    setShowToast,
    showToast: { show, message, type },
  } = useContext(TeacherContext);

  const { updateTeacher } = useContext(SchoolContext);

  // State
  const [updatedState, setUpdatedState] = useState(teacher);

  useEffect(() => setUpdatedState(teacher), [teachers]);

  const { username, password, name, major, phoneNumber, email, address, dob } =
    updatedState;

  const onChangeUpdatedForm = (event) =>
    setUpdatedState({
      ...updatedState,
      [event.target.name]: event.target.value,
    });
  const history = useHistory();
  // Context
  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const { message, success } = await updateTeacher(updatedState);
      if (message) {
        setShowToast({ show: true, message, type: null });
        toast(message);
        getTeachers();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        history.push("/teachers");
      }
    } catch (error) {}
  };
  return (
    <div className="newElement">
      <h1 className="newElementTitle">Edit Teacher Information</h1>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-col-25">
            <label>Teacher Name</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="fname"
              name="name"
              value={name}
              onChange={onChangeUpdatedForm}
              placeholder={teacher.name}
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
              placeholder={teacher.phoneNumber}
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
