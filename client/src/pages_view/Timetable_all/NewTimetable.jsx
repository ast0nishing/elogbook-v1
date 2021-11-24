import "./newUser.css";

import { useContext, useState } from 'react'
import { TimetableContext } from '../../contexts/TimetableContext'
import React from "react";


export default function newTimeTable() {
	// Contexts
	const {
		showAddTimetableTable,
		setShowAddTimetableTable,
		addTimetable,
		setShowToast
	} = useContext(TimetableContext)

	// State
	const [newTimetable, setNewTimetable] = useState({
		username: '',
		password: '',
		fullname: '',
		phone:"",
    school:"",
    id:"",
    role:"admin"
	})
  
	const { username,password,fullname,phone,school,id} = newTimetable

	const onChangeNewTimetableForm = event =>
		setNewTimetable({ ...newTimetable, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddLogbookData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addTimetable(newTimetable)
		resetAddTimetableData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddTimetableData = () => {
		setNewTimetable({ username:"",password:"",fullname:"",phone:"",school:"",id:"" })
		setShowAddLogbookTable(false)
	}
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Timetable</h1>
      <form className="newUserForm" onSubmit={onSubmit}>
        <div className="newUserItem">
          <label>Username</label>
          <input 
                      type="text"
                      placeholder="Username"
                      name="username"
                      required
                      value={username}
                      onChange={onChangeNewTimetableForm} />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input 
                                type="text"
                                placeholder="Nguyen Tan Thanh Giang"
                                name="fullname"
                                required
                                value={fullname}
                                onChange={onChangeNewTimetableForm} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input 
                                type="text"
                                placeholder="Password"
                                name="password"
                                required
                                value={password}
                                onChange={onChangeNewTimetableForm}/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input 
                                type="text"
                                placeholder="0364002059"
                                name="phone"
                                required
                                value={phone}
                                onChange={onChangeNewTimetableForm} />
        </div>
        <div className="newUserItem">
          <label>School</label>
          <input 
                                type="text"
                                placeholder="TPMS"
                                name="school"
                                required
                                value={school}
                                onChange={onChangeNewTimetableForm} />
        </div>
        <div className="newUserItem">
          <label>ID</label>
          <input 
                                type="text"
                                placeholder="001"
                                name="id"
                                required
                                value={id}
                                onChange={onChangeNewTimetableForm} />
        </div>
        <div>
          
        </div>
        <button className="newUserButton">Create</button>
      </form>
      
    </div>
  );
}
