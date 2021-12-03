/** @format */

import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import Sidebar from "../sidebar/Sidebars";
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
  });
  const styles = {
    marginLeft: margined,
  };

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
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Report
          </Menu.Item>
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
