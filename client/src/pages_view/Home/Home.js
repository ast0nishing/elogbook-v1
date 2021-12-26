/** @format */
import Form from "react-bootstrap/Form";
import "../Css/elementList.css";
import { DataGrid } from "@material-ui/data-grid";
import { TimetableContext } from "../../contexts/TimetableContext";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
// Get all context data
import { useHistory } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { CourseContext } from "../../contexts/CourseContext";
import { TeacherContext } from "../../contexts/TeacherContext";
import { StudentContext } from "../../contexts/StudentContext";
import { useEffect, useContext, useState } from "react";
import { DeleteOutline } from "@material-ui/icons";
import addIcon from "../../assets/plus-circle-fill.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
export default function Home() {
  const { getTeachers } = useContext(TeacherContext);
  const { getUser } = useContext(UserContext);
  const { getCourses } = useContext(CourseContext);
  const { getStudents } = useContext(StudentContext);

  useEffect(() => getUser(), []);
  useEffect(() => getCourses(), []);
  useEffect(() => getTeachers(), []);
  useEffect(() => getStudents({ year: 2019, name: "9A2" }), []);
  useEffect(() => getTimetablesYearWeek({ year: 2019, week: -1 }), []);
  // Contexts
  const {
    timetableState: { matrix, timetables, timetablesLoading },
    getTimetables,
    showToast: { show, message, type },
    setShowToast,
    deleteTimetable,
    findTimetable,
    getTimetablesYearWeek,
  } = useContext(TimetableContext);

  const history = useHistory();
  let body = null;
  if (timetablesLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (timetables.length == 0) {
    body = (
      <>
        <div className="elementList">
          <h2 className="header">
            There is no timetable available, please add by yourself
          </h2>
        </div>
      </>
    );
  } else {
    const test = Object.keys(matrix[0]);
    const non_key = ["id", "Date", "Time", "key", "9A9_id"];
    const final = test.filter((item) => !non_key.includes(item));

    const columns = [
      { field: "Date", headerName: "Date", width: 200 },
      { field: "Time", headerName: "Time", width: 200 },
    ];

    final.forEach(function (el) {
      columns.push({
        field: el,
        headerName: el,
        width: 250,
      });
    });
    body = (
      <>
        <div>
          <ToastContainer
            show={show}
            style={{ position: "top-left", top: "10%", right: "5%" }}
            className={`bg-danger text-white`}
            onClose={setShowToast.bind(this, {
              show: false,
              message: "",
              type: null,
            })}
            delay={3000}
            autohide
          />
          <DataGrid
            rows={matrix}
            getRowId={(r) => r.key}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            style={{ height: 500 }}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <div>
        <h2 className="header">The current timetable</h2>
        {body}
      </div>
    </>
  );
}
