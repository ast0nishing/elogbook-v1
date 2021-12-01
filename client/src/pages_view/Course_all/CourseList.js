/** @format */

import "../Css/elementList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import addIcon from "../../assets/plus-circle-fill.svg";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
// import {courses} from "../../dummyData"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CourseContext } from "../../contexts/CourseContext";
import { AuthContext } from "../../contexts/AuthContext";
import ActionButtons from "./ActionButtons";
export default function CourseList() {
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    courseState: { course, courses, coursesLoading },
    getCourses,
    setShowAddCourseTable,
    showToast: { show, message, type },
    setShowToast,
    deleteCourse,
    findCourse,
  } = useContext(CourseContext);

  useEffect(() => getCourses(), []);
  // Get all course
  const [data, setData] = useState(courses);
  const history = useHistory();
  // Select course for editing
  const handleChoose = (courseId) => {
    findCourse(courseId);
    history.push("/coursedetail");
  };

  const handleDelete = (courseId) => {
    deleteCourse(courseId);
    setData(data.filter((item) => item.code !== courseId));
  };
  const columns = [
    { field: "code", headerName: "Course Code", width: 200 },
    {
      field: "name",
      headerName: "Course name",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              className="elementListEdit"
              onClick={() => handleChoose(params.row.code)}
            >
              Edit
            </button>
            <DeleteOutline
              className="ListDelete"
              onClick={() => handleDelete(params.row.code)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="elementList">
        <DataGrid
          rows={data}
          getRowId={(r) => r.code}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      </div>
      <div>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add new course</Tooltip>}
        >
          <Link to={"/newcourse"}>
            <Button className="btn-floating" style={{ "z-index": -1 }}>
              <img src={addIcon} alt="add-post" width="60" height="60" />
            </Button>
          </Link>
        </OverlayTrigger>
      </div>
    </>
  );
}
