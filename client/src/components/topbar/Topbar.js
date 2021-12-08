/** @format */

import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Image } from "@material-ui/icons";
export default function Topbar() {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Online Logbook.v1</span>
        </div>

        <div className="topRight">
          <Link to="/personal">
            <img
              src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="topAvatar"
            />
          </Link>
          <Button className="UpdateButton" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
