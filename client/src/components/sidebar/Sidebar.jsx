import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Sidebar(){
  const {
    authState: { role },
  } = useContext(AuthContext);
  let body;
  if (role==="admin")
  body = (
    <>
    <Link  to="/schools" className="link">
    <li className="sidebarListItem">
      <PermIdentity className="sidebarIcon" />
      School
    </li>
  </Link>
  <Link  className="link">
    <li className="sidebarListItem">
      <PermIdentity className="sidebarIcon" />
      Course
    </li>
  </Link>
  <Link  className="link">
    <li className="sidebarListItem">
      <PermIdentity className="sidebarIcon" />
      Lesson
    </li>
  </Link>
  </>
  )
  else if (role==="school") 
  body = (
    <>
  <Link to="/teacher" className="link">
    <li className="sidebarListItem">
      <PermIdentity className="sidebarIcon" />
      Teacher
    </li>
  </Link>
  <Link to="/students" className="link">
    <li className="sidebarListItem">
      <PermIdentity className="sidebarIcon" />
      Student
    </li>
  </Link>
  <Link to="/students" className="link">
    <li className="sidebarListItem">
      <PermIdentity className="sidebarIcon" />
      Class
    </li>
  </Link>
  <Link to="/students" className="link">
    <li className="sidebarListItem">
      <PermIdentity className="sidebarIcon" />
      TimeTable
    </li>
  </Link>
  </>
  )
  else if (role==="teacher") 
  body = (
    <>
  <Link to="/students" className="link">
    <li className="sidebarListItem">
      <PermIdentity className="sidebarIcon" />
      Student
    </li>
  </Link>
  <Link to="/students" className="link">
    <li className="sidebarListItem">
      <PermIdentity className="sidebarIcon" />
      TimeTable
    </li>
  </Link>  
  <Link to="/students" className="link">
    <li className="sidebarListItem">
      <PermIdentity className="sidebarIcon" />
      Logbook
    </li>
  </Link>
  <Link to="/students" className="link">
    <li className="sidebarListItem">
      <PermIdentity className="sidebarIcon" />
      Ranking
    </li>
  </Link>
  </>
  )
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Report
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Mangement</h3>
          <ul className="sidebarList">
{body}

          </ul>
        </div>
    </div>
    </div>
  );
}
