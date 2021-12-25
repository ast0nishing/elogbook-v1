/** @format */

import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import Topbar from "../topbar/Topbar";
import "antd/dist/antd.css";
import "./sidebar.css";
import { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { role, authLoading, isAuthenticated },
  } = useContext(AuthContext);
  const { SubMenu } = Menu;
  // Theme State
  const { Header, Content, Footer, Sider } = Layout;

  const [state, setState] = useState({ collapsed: false });
  const [margin, setMargin] = useState({ marginLeft: 200 });
  const { collapsed } = state;
  const { margined } = margin;

  const onCollapse = () => {
    if (collapsed === false) {
      setState({ collapsed: true });
      setMargin({ margined: 80 });
    } else {
      setState({ collapsed: false });
      setMargin({ margined: 200 });
    }
  };

  useEffect(() => {
    setMargin({ margined: 200 });
  }, []);

  const styles = {
    marginLeft: margined,
  };
  const header = (
    <>
      <Menu.Item key="2" icon={<DesktopOutlined />}>
        <Link to="/">Notifications</Link>
      </Menu.Item>
      <SubMenu key="sub10" icon={<UserOutlined />} title="Your Information">
        <Menu.Item key="01">
          <Link to={"personal/" + role}> Account Infor </Link>
        </Menu.Item>
        <Menu.Item key="02">
          <Link to="/change-password"> Change Password </Link>
        </Menu.Item>
        <Menu.Item key="03">
          <Link to="/logout-all"> Logout All </Link>
        </Menu.Item>
      </SubMenu>
    </>
  );
  let body = null;
  if (authLoading)
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  else if (role === "admin")
    body = (
      <>
        <Menu theme="dark" defaultSelectedKeys={["2"]} mode="inline">
          {header}
          <SubMenu key="sub1" icon={<UserOutlined />} title="Management">
            {/* <Menu.Item key="3">
              <Link to="/admin"> Admin </Link>
            </Menu.Item> */}
            <Menu.Item key="4">
              <Link to="/schools"> School </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/courses"> Course </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/lessons"> Lesson </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="10" icon={<FileOutlined />}>
            Tutorial !
          </Menu.Item>
        </Menu>
      </>
    );
  else if (role == "school")
    body = (
      <>
        <Menu theme="dark" defaultSelectedKeys={["2"]} mode="inline">
          {header}
          <SubMenu key="sub1" icon={<UserOutlined />} title="Management">
            <SubMenu key="sub2" title="Student">
              <Menu.Item key="21">
                <Link to="/newstudent"> Create Student </Link>
              </Menu.Item>
              <Menu.Item key="22">
                <Link to="/students"> Student List </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title="Teacher">
              <Menu.Item key="31">
                <Link to="/newteacher"> Create Teacher </Link>
              </Menu.Item>
              <Menu.Item key="32">
                <Link to="/teachers"> Teacher List </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title="Class">
              <Menu.Item key="41">
                <Link to="/newclass"> Create Class </Link>
              </Menu.Item>
              <Menu.Item key="42">
                <Link to="/add-class-student"> Add Student </Link>
              </Menu.Item>
              <Menu.Item key="43">
                <Link to="/add-class-teacher"> Add Teacher</Link>
              </Menu.Item>
              <Menu.Item key="44">
                <Link to="/add-head-class-teacher"> Add Head Teacher </Link>
              </Menu.Item>
              {/* <Menu.Item key="45">
                <Link to="/classes"> Class List </Link>
              </Menu.Item> */}
            </SubMenu>
            <SubMenu key="sub5" title="Timetable">
              <Menu.Item key="51">
                <Link to="/new-timetable"> Create Timetable </Link>
              </Menu.Item>
              <Menu.Item key="52">
                <Link to="/timetables">Timetable List </Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
          <Menu.Item key="10" icon={<FileOutlined />}>
            Tutorial !
          </Menu.Item>
        </Menu>
      </>
    );
  else if (role == "teacher")
    body = (
      <>
        <Menu theme="dark" defaultSelectedKeys={["2"]} mode="inline">
          {header}
          <SubMenu key="sub1" icon={<UserOutlined />} title="Management">
            <SubMenu key="sub3" title="Logbook">
              <Menu.Item key="31">
                <Link to="/logbooks"> Week Class Logbook </Link>
              </Menu.Item>
              {/* <Menu.Item key="32">
                <Link to="/teachers"> Month Class Logbook </Link>
              </Menu.Item> */}
            </SubMenu>
            <SubMenu key="sub4" title="Ranking">
              <Menu.Item key="41">
                <Link to="/year-ranking">Year Ranking </Link>
              </Menu.Item>
              <Menu.Item key="43">
                <Link to="/week-ranking">Week Ranking </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" title="Timetable">
              <Menu.Item key="52">
                <Link to="/timetables">Timetable List </Link>
              </Menu.Item>
              <Menu.Item key="51">
                <Link to="/mytimetables">My Timetable </Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
          <Menu.Item key="10" icon={<FileOutlined />}>
            Tutorial !
          </Menu.Item>
        </Menu>
      </>
    );
  else {
    body = (
      <>
        <Menu theme="dark" defaultSelectedKeys={["2"]} mode="inline">
          {header}
          <SubMenu key="sub1" icon={<UserOutlined />} title="Management">
            {/* <SubMenu key="sub3" title="Logbook">
              <Menu.Item key="31">
                <Link to="/logbooks"> Week Class Logbook </Link>
              </Menu.Item>
              <Menu.Item key="32">
                <Link to="/teachers"> Month Class Logbook </Link>
              </Menu.Item>
            </SubMenu> */}
            <SubMenu key="sub4" title="Ranking">
              <Menu.Item key="41">
                <Link to="/year-ranking">Year Ranking </Link>
              </Menu.Item>
              <Menu.Item key="43">
                <Link to="/week-ranking">Week Ranking </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" title="Timetable">
              <Menu.Item key="52">
                <Link to="/timetables">Timetable List </Link>
              </Menu.Item>
              <Menu.Item key="51">
                <Link to="/mytimetables">My Timetable </Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
          <Menu.Item key="10" icon={<FileOutlined />}>
            Tutorial !
          </Menu.Item>
        </Menu>
      </>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <Topbar />
            <Layout hasSider="true">
              <Sider
                style={{
                  overflow: "auto",
                  height: "100vh",
                  position: "fixed",
                  left: 0,
                  collapsedWidth: "10",
                }}
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
              >
                <div className="logo" />
                {body}
              </Sider>
              <Layout className="site-layout" style={styles}>
                <Header
                  className="site-layout-background"
                  style={{ padding: 0 }}
                />
                <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                  <Component {...rest} {...props} />
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  TuytGiang Design ©2021
                </Footer>
              </Layout>
            </Layout>
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
