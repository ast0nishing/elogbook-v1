/** @format */

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import StudentContextProvider from "./contexts/StudentContext";
import SchoolContextProvider from "./contexts/SchoolContext";

import Dashboard from "./pages_view/Post_all/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import About from "./views/About";
// import CourseContextProvider from "./contexts/CourseContext";
// import ProductList from "./sub_test/pages/productList/ProductList";

// Core components and pages view
import Home from "./pages_view/Home/Home";

// Student all
import StudentList from "./pages_view/Student_all/StudentList";
import StudentDetail from "./pages_view/Student_all/Student";
import NewStudent from "./pages_view/Student_all/NewStudent";

// School all
import SchoolList from "./pages_view/School_all/SchoolList";
import SchoolDetail from "./pages_view/School_all/School";
import NewSchool from "./pages_view/School_all/NewSchool";

// import CourseList from "./pages_view/Course_all/courseList/CourseList";
// import Course from "./pages_view/Course_all/Course/Course";
// import NewCourse from "./pages_view/Course_all/newCourse/NewCourse";

import PostContextProvider from "./contexts/PostContext";
function App() {
  return (
    <AuthContextProvider>
      <StudentContextProvider>
        <SchoolContextProvider>
          <Router>
            <Switch>
              {/* Auth */}
              <Route
                exact
                path="/login"
                render={(props) => <Auth {...props} authRoute="login" />}
              />
              {/* <ProtectedRoute exact path="/" component={Home} /> */}
              {/* Course all */}

              {/* <ProtectedRoute exact path="/newCourse" component={NewCourse} />
            <ProtectedRoute exact path="/course/:courseID" component={Course} />
            <ProtectedRoute exact path="/courses" component={ProductList} /> */}
              {/* Student all */}
              <ProtectedRoute
                exact
                path="/student/:id"
                component={StudentDetail}
              />
              <ProtectedRoute exact path="/students" component={StudentList} />
              <ProtectedRoute exact path="/newstudent" component={NewStudent} />
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/about" component={About} />
              {/* School all */}
              <ProtectedRoute exact path="/schools" component={SchoolList} />
              <ProtectedRoute exact path="/newschool" component={NewSchool} />
              <ProtectedRoute
                exact
                path="/school/:id"
                component={SchoolDetail}
              />
            </Switch>
          </Router>
        </SchoolContextProvider>
      </StudentContextProvider>
    </AuthContextProvider>
  );
}

export default App;
