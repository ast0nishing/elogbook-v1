import {
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "../Css/element.css";
import { useState } from "react";
import { LessonContext } from '../../contexts/LessonContext'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useEffect } from 'react'

export default function Lesson() {
  	// // Contexts
    // const {
    //   lessonState: { lesson },
    //   showUpdateLessonTable,
    //   setShowUpdateLessonTable,
    //   updateLesson,
    //   setShowToast
    // } = useContext(LessonContext)

	// State

	// const [updatedLesson, setUpdatedLesson] = useState(lesson)
	// useEffect(() => setUpdatedLesson(lesson), [lesson])
	// const {username,fullname,phone} = updatedLesson
	// const onChangeUpdatedLessonForm = event =>
	// 	setUpdatedLesson({ ...updatedLesson, [event.target.name]: event.target.value })
  // Local state
  const [updatedCourse, setUpdatedCourse] = useState({    
    id: "1",
    code: "1",
    course: "Data Science",
    name:"Introduction to 1"
}
);  

const {id,code,name,course} = updatedCourse
const onChangeUpdatedCourseForm = event =>
  setUpdatedCourse({ ...updatedCourse, [event.target.name]: event.target.value })

	// const closeDialog = () => {
	// 	setUpdatedLesson(lesson)
	// 	setShowUpdateLessonTable(false)
	// }

	// const onSubmit = async event => {
	// 	event.preventDefault()
	// 	const { success, message } = await updateLesson(updatedLesson)
	// 	setShowUpdateLessonTable(false)
	// 	setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	// }
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Lesson</h1>
        <Link to="/newlesson">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">STT: {id}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Course Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{name}</span>
            </div>
            <span className="userShowTitle"></span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{course}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}