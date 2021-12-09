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

  const {
    fromWeek,
    toWeek,
    time,
    weekDay,
    course,
    courseCode,
    classId,
    className,
  } = updatedState;

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
        <div className="form-row">
          <div className="form-col-25">
            <label> To Week</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="toWeek"
              value={toWeek}
              onChange={onChangeUpdatedForm}
              placeholder={timetable.toWeek}
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label> Week day</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="weekDay"
              value={weekDay}
              onChange={onChangeUpdatedForm}
              placeholder={timetable.day}
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label> Time</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="time"
              value={time}
              onChange={onChangeUpdatedForm}
              placeholder={timetable.time}
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label> Class ID</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="classId"
              value={classId}
              onChange={onChangeUpdatedForm}
              placeholder={timetable.classId}
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label> ClassName</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="teacherId"
              value={className}
              onChange={onChangeUpdatedForm}
              placeholder={timetable.className}
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
