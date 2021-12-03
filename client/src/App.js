/** @format */
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import SchoolContextProvider from "./contexts/SchoolContext";
import CourseContextProvider from "./contexts/CourseContext";
import LessonContextProvider from "./contexts/LessonContext";
import StudentContextProvider from "./contexts/StudentContext";
import TeacherContextProvider from "./contexts/TeacherContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";

// Core components and pages view
import Home from "./pages_view/Home/Home";

// Admin section
// School all
import SchoolList from "./pages_view/School_all/SchoolList";
import SchoolDetail from "./pages_view/School_all/School";
import NewSchool from "./pages_view/School_all/NewSchool";

// Course all
import CourseList from "./pages_view/Course_all/CourseList";
import Course from "./pages_view/Course_all/Course";
import NewCourse from "./pages_view/Course_all/NewCourse";

// Lesson all
import LessonList from "./pages_view/Lesson_all/LessonList";
import Lesson from "./pages_view/Lesson_all/Lesson";
import NewLesson from "./pages_view/Lesson_all/NewLesson";

// School section
// Teacher all
import TeacherList from "./pages_view/Teacher_all/TeacherList";
import NewTeacher from "./pages_view/Teacher_all/NewTeacher";
// Student all
import StudentList from "./pages_view/Student_all/StudentList";
import StudentDetail from "./pages_view/Student_all/Student";
import NewStudent from "./pages_view/Student_all/NewStudent";

// import TestJson from "./pages_view/School_all/TestJson";
// import PostContextProvider from "./contexts/PostContext";

function App() {
  return (
    <AuthContextProvider>
      <SchoolContextProvider>
        <CourseContextProvider>
          <LessonContextProvider>
            <StudentContextProvider>
              <TeacherContextProvider>
                <Router>
                  <Switch>
                    {/* Teacher all */}
                    <ProtectedRoute
                      exact
                      path="/teachers"
                      component={TeacherList}
                    />
                    <ProtectedRoute
                      exact
                      path="/newteacher"
                      component={NewTeacher}
                    />
                    {/* Auth */}
                    <Route
                      exact
                      path="/login"
                      render={(props) => <Auth {...props} authRoute="login" />}
                    />
                    // {/* School all */}
                    <ProtectedRoute
                      exact
                      path="/schools"
                      component={SchoolList}
                    />
                    <ProtectedRoute
                      exact
                      path="/newschool"
                      component={NewSchool}
                    />
                    <ProtectedRoute
                      exact
                      path="/schooldetail"
                      component={SchoolDetail}
                    />
                    <ProtectedRoute
                      exact
                      path="/newCourse"
                      component={NewCourse}
                    />
                    <ProtectedRoute
                      exact
                      path="/coursedetail"
                      component={Course}
                    />
                    <ProtectedRoute
                      exact
                      path="/courses"
                      component={CourseList}
                    />
                    {/* Lesson all */}
                    <ProtectedRoute
                      exact
                      path="/lessons"
                      component={LessonList}
                    />
                    <ProtectedRoute
                      exact
                      path="/lessondetail"
                      component={Lesson}
                    />
                    <ProtectedRoute
                      exact
                      path="/newlesson"
                      component={NewLesson}
                    />
                    {/* Student all */}
                    <ProtectedRoute
                      exact
                      path="/student/:id"
                      component={StudentDetail}
                    />
                    <ProtectedRoute
                      exact
                      path="/students"
                      component={StudentList}
                    />
                    <ProtectedRoute
                      exact
                      path="/newstudent"
                      component={NewStudent}
                    />
                    <ProtectedRoute exact path="/" component={Home} />
                    {/* <Route exact path="/" component={TestJson} /> */}
                  </Switch>
                </Router>
              </TeacherContextProvider>
            </StudentContextProvider>
          </LessonContextProvider>
        </CourseContextProvider>
      </SchoolContextProvider>
    </AuthContextProvider>
  );
}

export default App;
