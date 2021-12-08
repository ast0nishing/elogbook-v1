/** @format */
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
// User
import School from "./pages_view/User_all/School";
// Admin
import SchoolContextProvider from "./contexts/SchoolContext";
import CourseContextProvider from "./contexts/CourseContext";
import LessonContextProvider from "./contexts/LessonContext";
// School
import StudentContextProvider from "./contexts/StudentContext";
import TeacherContextProvider from "./contexts/TeacherContext";
import ClassContextProvider from "./contexts/ClassContext";
// Timetable
import TimetableCalandar from "./pages_view/Timetable_all/TimetableCalandar";
import TimeTableContextProvider from "./contexts/TimetableContext";
import Timetable from "./pages_view/Timetable_all/Timetable";
// Core components and pages view
import Home from "./pages_view/Home/Home";
import UserContextProvider from "./contexts/UserContext";
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
import Teacher from "./pages_view/Teacher_all/Teacher";
// Student all
import StudentList from "./pages_view/Student_all/StudentList";
import StudentDetail from "./pages_view/Student_all/Student";
import NewStudent from "./pages_view/Student_all/NewStudent";
// Class all
import NewClass from "./pages_view/Class_all/NewClass";
import AddClassTeacher from "./pages_view/Class_all/AddClassTeacher";
import AddClassStudent from "./pages_view/Class_all/AddClassStudent";
import AddHeadClassTeacher from "./pages_view/Class_all/AddHeadClassTeacher";
import ClassList from "./pages_view/Class_all/ClassList";
// Timetable all
import NewTimetable from "./pages_view/Timetable_all/NewTimetable";
import TimetableList from "./pages_view/Timetable_all/TimetableList";

//App
function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        {/* Admin */}
        <SchoolContextProvider>
          <CourseContextProvider>
            <LessonContextProvider>
              {/* School */}
              <StudentContextProvider>
                <TeacherContextProvider>
                  <ClassContextProvider>
                    <TimeTableContextProvider>
                      <Router>
                        <Switch>
                          {/* Timetable context */}
                          <ProtectedRoute
                            exact
                            path="/timetable-detail"
                            component={Timetable}
                          />
                          {/* User all */}
                          <ProtectedRoute
                            exact
                            path="/personal"
                            component={School}
                          />
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
                          <ProtectedRoute
                            exact
                            path="/teacherdetail"
                            component={Teacher}
                          />
                          {/* Auth */}
                          <Route
                            exact
                            path="/login"
                            render={(props) => (
                              <Auth {...props} authRoute="login" />
                            )}
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
                          {/* Class */}
                          <ProtectedRoute
                            exact
                            path="/newclass"
                            component={NewClass}
                          />
                          <ProtectedRoute
                            exact
                            path="/add-class-teacher"
                            component={AddClassTeacher}
                          />
                          <ProtectedRoute
                            exact
                            path="/add-class-student"
                            component={AddClassStudent}
                          />
                          <ProtectedRoute
                            exact
                            path="/add-head-class-teacher"
                            component={AddHeadClassTeacher}
                          />
                          <ProtectedRoute
                            exact
                            path="/classes"
                            component={ClassList}
                          />
                          {/* Timetable all */}
                          <ProtectedRoute
                            exact
                            path="/new-timetable"
                            component={NewTimetable}
                          />
                          <ProtectedRoute
                            exact
                            path="/timetables"
                            component={TimetableList}
                          />
                          <ProtectedRoute
                            exact
                            path="/timetable-calandar"
                            component={TimetableCalandar}
                          />
                          <ProtectedRoute exact path="/" component={Home} />
                        </Switch>
                      </Router>
                    </TimeTableContextProvider>
                  </ClassContextProvider>
                </TeacherContextProvider>
              </StudentContextProvider>
            </LessonContextProvider>
          </CourseContextProvider>
        </SchoolContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
