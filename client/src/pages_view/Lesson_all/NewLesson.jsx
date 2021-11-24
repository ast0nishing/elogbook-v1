/** @format */

import "../Css/newElement.css";
import { useContext, useState } from "react";
import { LessonContext } from "../../contexts/LessonContext";
import React from "react";

export default function NewLesson() {
  // Contexts
  const { showAddLessonTable, setShowAddLessonTable, addLesson, setShowToast } =
    useContext(LessonContext);

  // State
  const [newLesson, setNewLesson] = useState({
    id: "",
    name: "",
    stt: "",
    course: "",
  });

  const { id, name, stt, course } = newLesson;

  const onChangeNewLessonForm = (event) =>
    setNewLesson({ ...newLesson, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddLessonData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addLesson(newLesson);
    resetAddLessonData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetAddLessonData = () => {
    setNewLesson({ id: "", name: "", stt: "", course: "" });
    setShowAddLessonTable(false);
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Lesson</h1>
      <form className="newUserForm" onSubmit={onSubmit}>
        <div className="newUserItem">
          <label>ID</label>
          <input
            type="text"
            placeholder="id"
            name="id"
            required
            value={id}
            onChange={onChangeNewLessonForm}
          />
        </div>
        <div className="newUserItem">
          <label>Name</label>
          <input
            type="text"
            placeholder="Nguyen Tan Thanh Giang"
            name="name"
            required
            value={name}
            onChange={onChangeNewLessonForm}
          />
        </div>
        <div className="newUserItem">
          <label>STT</label>
          <input
            type="stt"
            placeholder="01"
            name="stt"
            required
            value={stt}
            onChange={onChangeNewLessonForm}
          />
        </div>
        <div className="newUserItem">
          <label>Course</label>
          <input
            type="text"
            placeholder="Data science"
            name="course"
            required
            value={course}
            onChange={onChangeNewLessonForm}
          />
        </div>
        <div></div>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
