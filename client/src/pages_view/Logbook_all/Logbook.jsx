import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useState } from "react";
import { StudentContext } from '../../contexts/StudentContext'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useEffect } from 'react'

export default function User() {
  	// Contexts
    const {
      studentState: { student },
      showUpdateStudentTable,
      setShowUpdateStudentTable,
      updateStudent,
      setShowToast
    } = useContext(StudentContext)

	// State
	const [updatedStudent, setUpdatedStudent] = useState(student)

	useEffect(() => setUpdatedStudent(student), [student])

	const {username,fullname,phone} = updatedStudent

	const onChangeUpdatedStudentForm = event =>
		setUpdatedStudent({ ...updatedStudent, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedStudent(student)
		setShowUpdateStudentTable(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateStudent(updatedStudent)
		setShowUpdateStudentTable(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
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
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{fullname}</span>
            </div>
            <span className="userShowTitle"></span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{phone}</span>
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
