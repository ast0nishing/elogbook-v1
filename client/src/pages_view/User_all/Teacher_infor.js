/** @format */
import "../Css/newElement.css";
import "../Css/elementForm.css";
import "../Css/element.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PermIdentity, Publish } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Teacher_infor() {
  // // Contexts
  const {
    userState: { user },
    updateUser,
    setShowToast,
    showToast: { show, message, type },
  } = useContext(UserContext);
  // State
  const [updatedUser, setUpdatedUser] = useState(user);
  const { name, role, major, address, phoneNumber, email } = updatedUser;
  useEffect(() => setUpdatedUser(user), []);
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
            <label>Teacher Name</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="name"
              value={name}
              onChange={onChangeUpdatedUserForm}
              placeholder={user.name}
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label>Province</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="role"
              name="role"
              value={role}
              placeholder={user.province}
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label>Major</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="major"
              value={major}
              onChange={onChangeUpdatedUserForm}
              placeholder={user.major}
            ></input>
          </div>
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
            <label>Phone</label>
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
        <div className="form-row">
          <div className="form-col-25">
            <label>Email</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="email"
              value={email}
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
