/** @format */
import "../Css/newElement.css";
import "../Css/elementForm.css";
import "../Css/element.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PermIdentity, Publish } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function ChangePassword() {
  // // Contexts
  const {
    userState: { user },
    updateUser,
    setShowToast,
    changePassword,
    showToast: { show, message, type },
  } = useContext(UserContext);
  // State
  const [updatedState, setUpdatedState] = useState({
    oldPassword: null,
    newPassword: null,
  });
  const { oldPassword, newPassword } = updatedState;
  const onChangeUpdatedUserForm = (event) =>
    setUpdatedState({
      ...updatedState,
      [event.target.name]: event.target.value,
    });
  // Context
  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const { message, success } = await changePassword(updatedState);
      if (message) {
        setUpdatedState({ oldPassword: null, newPassword: null });
        setShowToast({ show: true, message, type: null });
        toast(message);
      }
    } catch (error) {}
  };
  return (
    <div className="newElement">
      <h1 className="newElementTitle">Update password</h1>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-col-25">
            <label>Old password</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="oldPassword"
              value={oldPassword}
              onChange={onChangeUpdatedUserForm}
              placeholder="Type your old password here .."
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label>New password</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="newPassword"
              value={newPassword}
              onChange={onChangeUpdatedUserForm}
              placeholder="Type your new password here .."
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
