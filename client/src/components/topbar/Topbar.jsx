/** @format */

import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import Button from "react-bootstrap/Button";
import logoutIcon from "../../assets/logout.svg";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
export default function Topbar()
{
const {
  authState: {
    user: { username}
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
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
<h1>  </h1>
                    <Button
                    className="UpdateButton"
            // variant="secondary"
            // className="font-weight-bolder text-white"
            onClick={logout}
          >
            <h4>Logout</h4>  
            
          </Button>
        </div>
      </div>
    </div>
  );
}
