/** @format */
// Decoration
import "../Css/newElement.css";
import "../Css/elementForm.css";
import { CSVReader } from "react-papaparse";
// React
import { useContext, useState } from "react";
import { TimetableContext } from "../../contexts/TimetableContext";
import { LogbookContext } from "../../contexts/LogbookContext";
import { LessonContext } from "../../contexts/LessonContext";
import React from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewLogbook() {
  // Timetable
  const {
    timetableState: { timetable },
  } = useContext(TimetableContext);
  // Logbook
  const {
    logbookState: { logbook },
    addLogbook,
    setShowToast,
  } = useContext(LogbookContext);
  const {
    lessonState: { lesson, lessons },
    getLessons,
  } = useContext(LessonContext);

  const [newState, setNewState] = useState({
    grade: "",
    week: timetable.week,
    comment: "",
    note: "",
    lessonId: lessons[0].id,
    timetableId: timetable.id,
  });

  const history = useHistory();

  const { grade, week, comment, note, lessonId } = newState;

  const onChangeForm = (event) =>
    setNewState({ ...newState, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    const { message } = await addLogbook([newState]);
    toast(message);
    setShowToast({ show: true });
  };

  const Option = () => {
    return (
      <select
        id="country"
        required
        name="lessonId"
        value={lessonId}
        onChange={onChangeForm}
      >
        {lessons.map((el) => (
          <option value={el.id}>{el.name}</option>
        ))}
      </select>
    );
  };

  return (
    <>
      <div className="newElement">
        <h1 className="newElementTitle">Add logbook</h1>
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <div className="form-col-25">
              <label>Week</label>
            </div>
            <div className="form-col-75">
              <p>{timetable.week}</p>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Year</label>
            </div>
            <div className="form-col-75">
              <p>{timetable.year}</p>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Class</label>
            </div>
            <div className="form-col-75">
              <p>{timetable.className}</p>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Day</label>
            </div>
            <div className="form-col-75">
              <p>{timetable.day}</p>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Course Name</label>
            </div>
            <div className="form-col-75">
              <p>{timetable.courseName}</p>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Lesson</label>
            </div>
            <div className="form-col-75">
              <Option />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Grade</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="fname"
                name="grade"
                value={grade}
                onChange={onChangeForm}
                placeholder="Username .."
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Comment</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="fname"
                name="comment"
                value={comment}
                onChange={onChangeForm}
                placeholder="Comment .."
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col-25">
              <label>Note</label>
            </div>
            <div className="form-col-75">
              <input
                type="text"
                id="fname"
                name="note"
                value={note}
                onChange={onChangeForm}
                placeholder="Note .."
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
      </div>
    </>
  );
}
