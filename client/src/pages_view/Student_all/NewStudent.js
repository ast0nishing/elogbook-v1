/** @format */
import { useContext, useState } from "react";
import { StudentContext } from "../../contexts/StudentContext";
import React from "react";

export default function NewStudent() {
  // Contexts
  const {
    showAddStudentTable,
    setShowAddStudentTable,
    addStudent,
    setShowToast,
  } = useContext(StudentContext);

  // State
  const [newStudent, setNewStudent] = useState({
    username: "",
    password: "",
    name: "",
    phoneNumber: "",
    school: "",
    id: "",
    role: "student",
    classname: "",
    email: "",
    adress: "",
  });

  const {
    username,
    password,
    name,
    phoneNumber,
    school,
    classname,
    email,
    address,
  } = newStudent;

  const onChangeNewStudentForm = (event) =>
    setNewStudent({ ...newStudent, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddStudentData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addStudent(newStudent);
    resetAddStudentData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetAddStudentData = () => {
    setNewStudent({
      username: "",
      password: "",
      fullname: "",
      phone: "",
      school: "",
      id: "",
    });
    setShowAddStudentTable(false);
  };
  return (
    <>
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
              onChange={onChangeNewStudentForm}
            />
          </div>
          <div className="newUserItem">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Nguyen Tan Thanh Giang"
              name="name"
              required
              value={name}
              onChange={onChangeNewStudentForm}
            />
          </div>
          <div className="newUserItem">
            <label>Email</label>
            <input
              type="text"
              placeholder="Nguyen Tan Thanh Giang"
              name="email"
              required
              value={email}
              onChange={onChangeNewStudentForm}
            />
          </div>
          <div className="newUserItem">
            <label>Password</label>
            <input
              type="text"
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={onChangeNewStudentForm}
            />
          </div>
          <div className="newUserItem">
            <label>Phone</label>
            <input
              type="text"
              placeholder="0364002059"
              name="phoneNumber"
              required
              value={phoneNumber}
              onChange={onChangeNewStudentForm}
            />
          </div>
          <div className="newUserItem">
            <label>School</label>
            <input
              type="text"
              placeholder="TPMS"
              name="school"
              required
              value={school}
              onChange={onChangeNewStudentForm}
            />
          </div>
          <div className="newUserItem">
            <label>Class</label>
            <input
              type="text"
              placeholder="6"
              name="classname"
              required
              value={classname}
              onChange={onChangeNewStudentForm}
            />
          </div>
          <div className="newUserItem">
            <label>Address</label>
            <input
              type="text"
              placeholder="001"
              name="address"
              required
              value={address}
              onChange={onChangeNewStudentForm}
            />
          </div>
          <div></div>
          <button className="newUserButton">Create</button>
        </form>
        <br></br>
        <div className="newUser">
          <h1 className="newUserTitle">New Student Using File</h1>
          <button className="userAddButton">Create</button>
        </div>
      </div>
    </>
  );
}
