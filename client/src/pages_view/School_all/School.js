/** @format */

// Decorations
import { PermIdentity, Publish } from "@material-ui/icons";
import "../Css/element.css";
// React element
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
// Contexts
import { SchoolContext } from "../../contexts/SchoolContext";
import { AuthContext } from "../../contexts/AuthContext";

export default function School() {
  // // Contexts
  // const {
  //   schoolState: { school },
  //   showUpdateSchoolTable,
  //   setShowUpdateSchoolTable,
  //   updateSchool,
  //   setShowToast
  // } = useContext(SchoolContext)

  // State

  // const [updatedSchool, setUpdatedSchool] = useState(school)
  // useEffect(() => setUpdatedStudent(school), [school])
  // const {username,name,phone,email,password,address,phoneNumber} = updatedSchool
  // const onChangeUpdatedSchoolForm = event =>
  // 	setUpdatedSchool({ ...updatedSchool, [event.target.name]: event.target.value })
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
  });

  const {
    username,
    name,
    password,
    province,
    district,
    town,
    street,
    streetNo,
    role,
  } = updatedSchool;
  const onChangeUpdatedSchoolForm = (event) =>
    setUpdatedSchool({
      ...updatedSchool,
      [event.target.name]: event.target.value,
    });

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
    <div className="element">
      <div className="elementTitleContainer">
        <h1 className="elementTitle">Edit School</h1>
        <Link to="/newschool">
          <button className="elementAddButton">Create</button>
        </Link>
      </div>
      <div className="elementContainer">
        <div className="elementShow">
          <div className="elementShowTop">
            <div className="elementShowTopTitle">
              <span className="elementShowUsername">{username}</span>
              <span className="elementShowUserTitle">{role}</span>
            </div>
          </div>
          <div className="elementShowBottom">
            <span className="elementShowTitle">Account Details</span>
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
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={name}
                  className="elementUpdateInput"
                  value={name}
                  name="name"
                  onChange={onChangeUpdatedSchoolForm}
                />
              </div>
              <div className="elementUpdateItem">
                <label>password</label>
                <input
                  type="text"
                  placeholder={password}
                  className="elementUpdateInput"
                  value={password}
                  name="password"
                  onChange={onChangeUpdatedSchoolForm}
                />
              </div>
              <div className="elementUpdateItem">
                <label>Province</label>
                <input
                  type="text"
                  placeholder={province}
                  className="elementUpdateInput"
                  value={province}
                  name="province"
                  onChange={onChangeUpdatedSchoolForm}
                />
              </div>
              <div className="elementUpdateItem">
                <label>District</label>
                <input
                  type="text"
                  placeholder={district}
                  className="elementUpdateInput"
                  value={district}
                  name="district"
                  onChange={onChangeUpdatedSchoolForm}
                />
              </div>
              <div className="elementUpdateItem">
                <label>Town</label>
                <input
                  type="text"
                  placeholder={town}
                  className="elementUpdateInput"
                  value={town}
                  name="town"
                  onChange={onChangeUpdatedSchoolForm}
                />
              </div>
              <div className="elementUpdateItem">
                <label>Street</label>
                <input
                  type="text"
                  placeholder={street}
                  className="elementUpdateInput"
                  name="street"
                  value={street}
                  onChange={onChangeUpdatedSchoolForm}
                />
              </div>
              <div className="elementUpdateItem">
                <label>StreetNo</label>
                <input
                  type="text"
                  placeholder={streetNo}
                  className="elementUpdateInput"
                  name="streetNo"
                  value={streetNo}
                  onChange={onChangeUpdatedSchoolForm}
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
              <button
                className="elementUpdateButton"
                // onSubmit={}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
