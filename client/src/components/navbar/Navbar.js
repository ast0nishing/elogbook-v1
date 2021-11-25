/** @format */
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";

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
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Link } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory, useLocation } from "react-router";

export default function Topbar() {
  const history = useHistory();
  const location = useLocation();
  return (
    <SideNav
      onSelect={(selected) => {
        const to = "/" + selected;
        if (location.pathname !== to) {
          history.push(to);
        }
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText link>Dashboard</NavText>
        </NavItem>
        <NavItem eventKey="charts">
          <NavIcon>
            <i
              className="fa fa-fw fa-line-chart"
              style={{ fontSize: "1.75em" }}
            />
          </NavIcon>
          <NavText>Management</NavText>
          <NavItem eventKey="schools">
            <NavText>School</NavText>
          </NavItem>
          <NavItem eventKey="courses">
            <NavText>Course</NavText>
          </NavItem>
          <NavItem eventKey="lessons">
            <NavText>Lesson</NavText>
          </NavItem>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}
