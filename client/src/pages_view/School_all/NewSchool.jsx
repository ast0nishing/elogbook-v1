import "../Student_all/newUser.css";

import { useContext, useState } from 'react'
import { SchoolContext } from '../../contexts/SchoolContext'
import React from "react";

export default function NewSchool() {
	// Contexts
	const {
		showAddSchoolTable,
		setShowAddSchoolTable,
		addSchool,
		setShowToast
	} = useContext(SchoolContext)

	// State
	const [newSchool, setNewSchool] = useState({
		username: '',
		password: '',
		name: '',
    id:"",
    role:"student",
    classname:"",
    email:"",
    province:"",
    district:"",
    street:"",
    streeNo:""
	})
  
	const { username,password,name,province,district} = newSchool

	const onChangeNewSchoolForm = event =>
		setNewSchool({ ...newSchool, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddSchoolData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addSchool(newSchool)
		resetAddSchoolData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddSchoolData = () => {
		setNewSchool({ username:"",password:"",district:"",province:"",name:"" })
		setShowAddSchoolTable(false)
	}
  return (
    <>
      <div className="newUser">
      <h1 className="newUserTitle">New School</h1>
      <form className="newUserForm" onSubmit={onSubmit}>
        <div className="newUserItem">
          <label>Username</label>
          <input 
                      type="text"
                      placeholder="Username"
                      name="username"
                      required
                      value={username}
                      onChange={onChangeNewSchoolForm} />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input 
                                type="text"
                                placeholder="Nguyen Tan Thanh Giang"
                                name="name"
                                required
                                value={name}
                                onChange={onChangeNewSchoolForm} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input 
                                type="text"
                                placeholder="Password"
                                name="password"
                                required
                                value={password}
                                onChange={onChangeNewSchoolForm}/>
        </div>

        <div className="newUserItem">
          <label>Province</label>
          <input 
                                type="text"
                                placeholder="001"
                                name="province"
                                required
                                value={province}
                                onChange={onChangeNewSchoolForm} />
        </div>
        <div>
          
        </div>
        <button className="newUserButton">Create</button>
      </form>
      <br></br>
      <div className="newUser">
      <h1 className="newUserTitle">New School Using File</h1>
      <button className="userAddButton">Create</button>
  </div>
    </div>
  
    
    </>
  );
}
