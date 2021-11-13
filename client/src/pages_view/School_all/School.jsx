import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "../Student_all/user.css";
import { useState } from "react";
import { SchoolContext } from '../../contexts/SchoolContext'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useEffect } from 'react'

export default function School() {
  	// // Contexts
    // const {
    //   studentState: { student },
    //   showUpdateStudentTable,
    //   setShowUpdateStudentTable,
    //   updateStudent,
    //   setShowToast
    // } = useContext(StudentContext)

	// State

	// const [updatedStudent, setUpdatedStudent] = useState(student)
  
	// useEffect(() => setUpdatedStudent(student), [student])
  // const {username,name,phone,email,password,address,phoneNumber} = updatedStudent
	// const onChangeUpdatedSchoolForm = event =>
	// 	setUpdatedStudent({ ...updatedStudent, [event.target.name]: event.target.value })
    // Context  
    // Local state
    const [updatedSchool, setUpdatedSchool] = useState({    
      id: "1",
      username: "TTS",
      password: "12345",
      name: "TTS",
      role: "school",
      province: "Vinh Long",
      district: "Mang Thit",
      town: "Cai Nhum",
      street: "NA",
      streetNo: "NA",
}
    );  

  const {username,name,password,province,district,town,street,streetNo,role} = updatedSchool
	const onChangeUpdatedSchoolForm = event =>
		setUpdatedSchool({ ...updatedSchool, [event.target.name]: event.target.value })

	// const closeDialog = () => {
	// 	setUpdatedStudent(student)
	// 	setShowUpdateStudentTable(false)
	// }

	// const onSubmit = async event => {
	// 	event.preventDefault()
	// 	const { success, message } = await updateStudent(updatedStudent)
	// 	setShowUpdateStudentTable(false)
	// 	setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	// }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit School</h1>
        <Link to="/newschool">
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
              <span className="userShowUsername">{username}</span>
              <span className="userShowUserTitle">{role}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{name}</span>
            </div>
            <span className="userShowTitle"></span>
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
                  placeholder={username}
                  className="userUpdateInput"
                  name="username"
                  value={username}
                  onChange={onChangeUpdatedSchoolForm}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={name}
                  className="userUpdateInput"
                  value={name}
                  name="name"
                  onChange={onChangeUpdatedSchoolForm}
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
              <button className="userUpdateButton"
              // onSubmit={}
              >Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
