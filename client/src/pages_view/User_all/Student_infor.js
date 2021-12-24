/** @format */
import "../Css/newElement.css";
import "../Css/elementForm.css";
import "../Css/element.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Student_Infor() {
  const role = JSON.parse(sessionStorage["user"]).role;
  // Contexts
  const {
    userState: { user },
    updateUser,
    setShowToast,
    showToast: { show, message, type },
  } = useContext(UserContext);
  // State
  const [updatedUser, setUpdatedUser] = useState(user);
  const { address, phoneNumber } = updatedUser;

  const onChangeUpdatedUserForm = (event) =>
    setUpdatedUser({
      ...updatedUser,
      [event.target.name]: event.target.value,
    });
  // Context
  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const { message, success } = await updateUser(updatedUser);
      if (message) {
        setShowToast({ show: true, message, type: null });
        toast(message);
      }
    } catch (error) {}
  };
  return (
    <div className="newElement">
      <h1 className="newElementTitle">Edit Account Information</h1>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-col-25">
            <label>User Name</label>
          </div>
          <div className="form-col-75">{user.username}</div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label>Name</label>
          </div>
          <div className="form-col-75">{user.studentName}</div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label>Email</label>
          </div>
          <div className="form-col-75">{user.email}</div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label>Student ID</label>
          </div>
          <div className="form-col-75">{user.studentId}</div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label>Head Teacher</label>
          </div>
          <div className="form-col-75">{user.teacherName}</div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label>Class</label>
          </div>
          <div className="form-col-75">{user.className}</div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label>Address</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="address"
              value={address}
              onChange={onChangeUpdatedUserForm}
              placeholder={user.address}
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label>Phone Number</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChangeUpdatedUserForm}
              placeholder={user.phoneNumber}
            ></input>
          </div>
        </div>
        <br></br>
        <div className="form-row">
          <input type="submit" value="Submit" onClick={onSubmit}></input>
        </div>
        <div>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}
