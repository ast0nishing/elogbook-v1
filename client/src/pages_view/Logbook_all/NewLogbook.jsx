import "./newUser.css";

import { useContext, useState } from 'react'
import { StudentContext } from '../../contexts/StudentContext'
import React from "react";


export default function newStudent() {
	// Contexts
	const {
		showAddStudentTable,
		setShowAddStudentTable,
		addStudent,
		setShowToast
	} = useContext(StudentContext)

	// State
	const [newStudent, setNewStudent] = useState({
		username: '',
		password: '',
		fullname: '',
		phone:"",
    school:"",
    id:"",
    role:"student"
	})
  
	const { username,password,fullname,phone,school,id} = newStudent

	const onChangeNewStudentForm = event =>
		setNewStudent({ ...newStudent, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddStudentData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addStudent(newStudent)
		resetAddStudentData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddStudentData = () => {
		setNewStudent({ username:"",password:"",fullname:"",phone:"",school:"",id:"" })
		setShowAddStudentTable(false)
	}
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Student</h1>
      <form className="newUserForm" onSubmit={onSubmit}>
        <div className="newUserItem">
          <label>Username</label>
          <input 
                      type="text"
                      placeholder="Username"
                      name="username"
                      required
                      value={username}
                      onChange={onChangeNewStudentForm} />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input 
                                type="text"
                                placeholder="Nguyen Tan Thanh Giang"
                                name="fullname"
                                required
                                value={fullname}
                                onChange={onChangeNewStudentForm} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input 
                                type="text"
                                placeholder="Password"
                                name="password"
                                required
                                value={password}
                                onChange={onChangeNewStudentForm}/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input 
                                type="text"
                                placeholder="0364002059"
                                name="phone"
                                required
                                value={phone}
                                onChange={onChangeNewStudentForm} />
        </div>
        <div className="newUserItem">
          <label>School</label>
          <input 
                                type="text"
                                placeholder="TPMS"
                                name="school"
                                required
                                value={school}
                                onChange={onChangeNewStudentForm} />
        </div>
        <div className="newUserItem">
          <label>ID</label>
          <input 
                                type="text"
                                placeholder="001"
                                name="id"
                                required
                                value={id}
                                onChange={onChangeNewStudentForm} />
        </div>
        <div>
          
        </div>
        <button className="newUserButton">Create</button>
      </form>
      
    </div>
  );
}
