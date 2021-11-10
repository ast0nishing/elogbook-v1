/** @format */

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import StudentContextProvider from "./contexts/StudentContext";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import About from "./views/About";
// import CourseContextProvider from "./contexts/CourseContext";
import ProductList from "./sub_test/pages/productList/ProductList";
// Core components and pages view
import Home from "./pages_view/Home/Home";
import UserList from "./pages_view/User_all/userList/UserList";
import User from "./pages_view/User_all/user/User";
import NewUser from "./pages_view/User_all/newUser/NewUser";
import CourseList from "./pages_view/Course_all/courseList/CourseList";
import Course from "./pages_view/Course_all/Course/Course";
import NewCourse from "./pages_view/Course_all/newCourse/NewCourse";
// import Sidebar from "./sub_test/components/sidebar/Sidebar";
// import Topbar from "./sub_test/components/topbar/Topbar";
function App() {
  return (
    <AuthContextProvider>
      <StudentContextProvider>
        <Router>
          <Switch>
            {/* Auth */}
            <Route
              exact
              path="/login"
              render={(props) => <Auth {...props} authRoute="login" />}
            />
            <Route
              exact
              path="/register"
              render={(props) => <Auth {...props} authRoute="register" />}
            />
            <ProtectedRoute exact path="/" component={Home} />
            {/* Course all */}

            <ProtectedRoute exact path="/newCourse" component={NewCourse} />
            <ProtectedRoute exact path="/course/:courseID" component={Course} />
            <ProtectedRoute exact path="/courses" component={ProductList} />
            {/* User all */}
            <ProtectedRoute exact path="/user/:userId" component={User} />
            <ProtectedRoute exact path="/users" component={UserList} />
            <ProtectedRoute exact path="/newUser" component={NewUser} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/about" component={About} />
          </Switch>
        </Router>
      </StudentContextProvider>
    </AuthContextProvider>
  );
}

export default App;
