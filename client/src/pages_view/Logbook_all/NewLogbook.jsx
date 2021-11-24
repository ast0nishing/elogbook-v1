import "./newUser.css";

import { useContext, useState } from 'react'
import { LogbookContext } from '../../contexts/LogbookContext'
import React from "react";


export default function newLogbook() {
	// Contexts
	const {
		showAddLogbookTable,
		setShowAddLogbookTable,
		addLogbook,
		setShowToast
	} = useContext(LogbookContext)

	// State
	const [newLogbook, setNewLogbook] = useState({
		username: '',
		password: '',
		fullname: '',
		phone:"",
    school:"",
    id:"",
    role:"logbook"
	})
  
	const { username,password,fullname,phone,school,id} = newLogbook

	const onChangeNewLogbookForm = event =>
		setNewLogbook({ ...newLogbook, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddLogbookData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addLogbook(newLogbook)
		resetAddLogbookData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddLogbookData = () => {
		setNewLogbook({ username:"",password:"",fullname:"",phone:"",school:"",id:"" })
		setShowAddLogbookTable(false)
	}
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Logbook</h1>
      <form className="newUserForm" onSubmit={onSubmit}>
        <div className="newUserItem">
          <label>Username</label>
          <input 
                      type="text"
                      placeholder="Username"
                      name="username"
                      required
                      value={username}
                      onChange={onChangeNewLogbookForm} />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input 
                                type="text"
                                placeholder="Nguyen Tan Thanh Giang"
                                name="fullname"
                                required
                                value={fullname}
                                onChange={onChangeNewLogbookForm} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input 
                                type="text"
                                placeholder="Password"
                                name="password"
                                required
                                value={password}
                                onChange={onChangeNewLogbookForm}/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input 
                                type="text"
                                placeholder="0364002059"
                                name="phone"
                                required
                                value={phone}
                                onChange={onChangeNewLogbookForm} />
        </div>
        <div className="newUserItem">
          <label>School</label>
          <input 
                                type="text"
                                placeholder="TPMS"
                                name="school"
                                required
                                value={school}
                                onChange={onChangeNewLogbookForm} />
        </div>
        <div className="newUserItem">
          <label>ID</label>
          <input 
                                type="text"
                                placeholder="001"
                                name="id"
                                required
                                value={id}
                                onChange={onChangeNewLogbookForm} />
        </div>
        <div>
          
        </div>
        <button className="newUserButton">Create</button>
      </form>
      
    </div>
  );
}
