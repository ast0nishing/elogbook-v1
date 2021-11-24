import {
    PermIdentity,
    Publish,
  } from "@material-ui/icons";


import "../Css/element.css";
import { Link } from "react-router-dom";
import {courseData} from "../../dummyData"
import { SchoolContext } from '../../contexts/SchoolContext'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useEffect,useState} from 'react'


export default function Course() {

  	// // Contexts
    // const {
    //   courseState: { course },
    //   showUpdateCourseTable,
    //   setShowUpdateCourseTable,
    //   updateCourse,
    //   setShowToast
    // } = useContext(CourseContext)

	// State

	// const [updatedCourse, setUpdatedCourse] = useState(course)
  
	// useEffect(() => setUpdatedCourse(course), [course])
  // const {username,name,phone,email,password,address,phoneNumber} = updatedCourse
	// const onChangeUpdatedCourseForm = event =>
	// 	setUpdatedCourse({ ...updatedCourse, [event.target.name]: event.target.value })
    // Context  
    // Local state
    const [updatedCourse, setUpdatedCourse] = useState({    
            id: "1",
            code: "1",
            name: "Data Science",
  }
      );  
  
    const {id,code,name} = updatedCourse
      const onChangeUpdatedCourseForm = event =>
          setUpdatedCourse({ ...updatedCourse, [event.target.name]: event.target.value })
  
      // const closeDialog = () => {
      // 	setUpdatedCourse(course)
      // 	setShowUpdateCourseTable(course)
      // }
  
      // const onSubmit = async event => {
      // 	event.preventDefault()
      // 	const { success, message } = await updateCourse(updatedCourse)
      // 	setShowUpdateCourseTable(false)
      // 	setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
      // }


    return (
        <div className="element">
          <div className="elementTitleContainer">
            <h1 className="elementTitle">Edit Course</h1>
            <Link to="/newcourse">
              <button className="elementAddButton">Create</button>
            </Link>
          </div>
          <div className="elementContainer">
            <div className="elementShow">
              <div className="elementShowTop">
                <div className="elementShowTopTitle">
                  <span className="elementShowElement">{code}</span>
                  <span className="elementShowElementTitle">{name}</span>
                </div>
              </div>
              <div className="elementShowBottom">
                <span className="elementShowTitle">Course Details</span>
                <div className="elementShowInfo">
                  <PermIdentity className="elementShowIcon" />
                  <span className="elementShowInfoTitle">{name}</span>
                </div>
                <span className="elementShowTitle"></span>
              </div>
            </div>
            <div className="elementUpdate">
              <span className="elementUpdateTitle">Edit</span>
              <form className="elementUpdateForm">
                <div className="elementUpdateLeft">
                  <div className="elementUpdateItem">
                    <label>Course name</label>
                    <input
                      type="text"
                      placeholder={name}
                      className="elementUpdateInput"
                      value={name}
                      name="name"
                      onChange={onChangeUpdatedCourseForm}
                    />
                  </div>
                  <div className="elementUpdateItem">
                    <label>Course code</label>
                    <input
                      type="text"
                      placeholder={code}
                      className="elementUpdateInput"
                      value={code}
                      name="code"
                      onChange={onChangeUpdatedCourseForm}
                    />
                  </div>
                </div>
                <div className="elementUpdateRight">
                  {/* <div className="elementUpdateUpload">
                    <img
                      className="elementUpdateImg"
                      src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                      alt=""
                    />
                    <label htmlFor="file">
                      <Publish className="elementUpdateIcon" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} />
                  </div> */}
                  <button className="elementUpdateButton"
                  // onSubmit={}
                  >Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    