/** @format */

import "../Css/newElement.css";
import { useContext, useState } from "react";
import { CourseContext } from "../../contexts/CourseContext";
import React from "react";

export default function Newcourse() {
  // Contexts
  const { showAddCourseTable, setShowAddCourseTable, addCourse, setShowToast } =
    useContext(CourseContext);

  // State
  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
  });

  const { code, name } = newCourse;

  const onChangeNewCourseForm = (event) =>
    setNewCourse({ ...newCourse, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddCourseData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addCourse(newCourse);
    resetAddCourseData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetAddCourseData = () => {
    setNewCourse({ name: "", code: "" });
    setShowAddCourseTable(false);
  };
  return (
    <>
      <div className="newElement">
        <h1 className="newElementTitle">New Course</h1>
        <form className="newElementForm" onSubmit={onSubmit}>
          <div className="newElementItem">
            <label>Course name</label>
            <input
              type="text"
              placeholder="Data Science"
              name="name"
              required
              value={name}
              onChange={onChangeNewCourseForm}
            />
          </div>
          <div className="newElementItem">
            <label>Course code</label>
            <input
              type="text"
              placeholder="101"
              name="code"
              required
              value={code}
              onChange={onChangeNewCourseForm}
            />
          </div>
          <button className="newElementButton">Create</button>
        </form>
        <br></br>
        <div className="newElement">
          <h1 className="newElementTitle">New School Using File</h1>
          <button className="elementAddButton">Create</button>
        </div>
      </div>
    </>
  );
}
