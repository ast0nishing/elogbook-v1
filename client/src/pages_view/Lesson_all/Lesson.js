/** @format */

import { PermIdentity, Publish } from "@material-ui/icons";
import "../Css/newElement.css";
import "../Css/elementForm.css";
import "../Css/element.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LessonContext } from "../../contexts/LessonContext";

export default function Lesson() {
  // // Contexts
  const {
    lessonState: { lesson },
    updateLesson,
    setShowToast,
    showToast: { show, message, type },
  } = useContext(LessonContext);
  // State
  const [updatedLesson, setUpdatedLesson] = useState(lesson);
  const {
    code,
    name,
    lessons: [],
  } = updatedLesson;

  // Effect
  useEffect(() => setUpdatedLesson(lesson), [lesson]);

  const onChangeUpdatedLessonForm = (event) =>
    setUpdatedLesson({
      ...updatedLesson,
      [event.target.name]: event.target.value,
    });
  // Context
  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const { message, success } = await updateLesson(updatedLesson);
      if (message) {
        setShowToast({ show: true, message, type: null });
        toast(message);
      }
    } catch (error) {}
  };
  return (
    <div className="newElement">
      <h1 className="newElementTitle">Edit Lesson Information</h1>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-col-25">
            <label>Code</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="fname"
              name="code"
              value={code}
              placeholder={lesson.code}
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label>Course Name</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="name"
              value={name}
              onChange={onChangeUpdatedLessonForm}
              placeholder={lesson.name}
            ></input>
          </div>
        </div>
        <br></br>
        <div className="form-row">
          <input type="submit" value="Submit" onClick={onSubmit}></input>
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
