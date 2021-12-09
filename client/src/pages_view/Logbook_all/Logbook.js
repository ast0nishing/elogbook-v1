/** @format */

import { PermIdentity, PhoneAndroid, Publish } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useState } from "react";
import { LogbookContext } from "../../contexts/LogbookContext";
import { TimetableContext } from "../../contexts/TimetableContext";
import { useContext, useEffect } from "react";

export default function User() {
  // Timetable
  const {
    timetableState: { timetables },
  } = useContext(TimetableContext);
  const {
    logbookState: { logbook: Logbook },
    updateLogbook,
    setShowToast,
  } = useContext(LogbookContext);

  // State
  const [updatedLogbook, setUpdatedLogbook] = useState(Logbook);

  useEffect(() => setUpdatedLogbook(Logbook), [Logbook]);

  const { username, fullname, phone } = updatedLogbook;

  const onChangeUpdatedLogbookForm = (event) =>
    setUpdatedLogbook({
      ...updatedLogbook,
      [event.target.name]: event.target.value,
    });

  const closeDialog = () => {
    setUpdateLogbook(Logbook);
    setShowUpdateLogbookTable(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateLogbook(updatedLogbook);
    setShowUpdateLogbookTable(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{fullname}</span>
            </div>
            <span className="userShowTitle"></span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{phone}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
