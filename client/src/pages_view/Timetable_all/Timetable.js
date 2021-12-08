/** @format */

import { PermIdentity, Publish } from "@material-ui/icons";
import "../Css/newElement.css";
import "../Css/elementForm.css";
import "../Css/element.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { TimetableContext } from "../../contexts/TimetableContext";
import { useContext, useEffect } from "react";

export default function Timetable() {
  // Contexts
  const {
    timetableState: { timetable, timetables },
    updateTimetable,
    setShowToast,
    showToast: { show, message, type },
  } = useContext(TimetableContext);

  // State
  const [updatedState, setUpdatedState] = useState(timetable);

  useEffect(() => setUpdatedState(timetable), [timetables]);

  const { fromWeek, toWeek, time, course, courseCode, classId, className } =
    updatedState;

  const onChangeUpdatedForm = (event) =>
    setUpdatedState({
      ...updatedState,
      [event.target.name]: event.target.value,
    });

  // Context
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(updatedState);
    const { message } = await updateTimetable(updatedState);
    if (message) {
      setShowToast({ show: true, message, type: null });
      toast(message);
    }
  };
  return (
    <div className="newElement">
      <h1 className="newElementTitle">Edit timetable Information</h1>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-col-25">
            <label>From week</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="fname"
              name="fromWeek"
              value={fromWeek}
              onChange={onChangeUpdatedForm}
              placeholder={timetable.fromWeek}
            ></input>
          </div>
        </div>
        {/* <div className="form-row">
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
              placeholder={timetable.phoneNumber}
            ></input>
          </div> */}
        {/* </div> */}
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
