/** @format */
import "../Css/newElement.css";
import "../Css/elementForm.css";
import "../Css/element.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PermIdentity, Publish } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function School_infor() {
  // // Contexts
  const {
    userState: { user },
    updateUser,
    setShowToast,
    showToast: { show, message, type },
  } = useContext(UserContext);
  // State
  const [updatedUser, setUpdatedUser] = useState(user);
  const { name, province, district, town, street, streetNo } = updatedUser;
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
            <label>School Name</label>
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
              id="lname"
              name="province"
              value={province}
              onChange={onChangeUpdatedUserForm}
              placeholder={user.province}
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label>District</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="district"
              value={district}
              onChange={onChangeUpdatedUserForm}
              placeholder={user.district}
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label>Town</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="town"
              value={town}
              onChange={onChangeUpdatedUserForm}
              placeholder={user.town}
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label>Street</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="street"
              value={street}
              onChange={onChangeUpdatedUserForm}
              placeholder={user.street}
            ></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-25">
            <label>Street Number</label>
          </div>
          <div className="form-col-75">
            <input
              type="text"
              id="lname"
              name="streetNo"
              value={streetNo}
              onChange={onChangeUpdatedUserForm}
              placeholder={user.streetNo}
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
