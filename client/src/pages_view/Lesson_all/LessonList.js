/** @format */

// Decoration
import "../Css/element.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import addIcon from "../../assets/plus-circle-fill.svg";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
// React
import { Link } from "react-router-dom";
import { useState } from "react";
import { LessonContext } from "../../contexts/LessonContext";
// Context
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
// Dummy data
import { lessons } from "../../dummyData";

export default function LessonList() {
  // // Auth context
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  // Lesson context
  const {
    lessonState: { lesson, lessons, lessonsLoading },
    getLessons,
    setShowAddLessonTable,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(LessonContext);

  useEffect(() => getLessons(), []);

  const [data, setData] = useState(lessons);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", width: 200 },
    { field: "stt", headerName: "STT", width: 200 },
    { field: "course", headerName: "Course", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/lessondetail"}>
              <button className="elementListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="elementListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  let body = null;
  if (lessons.length === 0) {
    body = (
      <>
        <div className="elementList">
          <h2 className="header">
            There is no lesson available, please create it to start your first
            logbook
          </h2>
          <Link to={"/newlesson"}>
            <Button className="btn-floating" style={{ "z-index": -1 }}>
              <img src={addIcon} alt="add-post" width="60" height="60" />
            </Button>
          </Link>
        </div>
      </>
    );
  } else {
    body = (
      <>
        <div className="elementList">
          <DataGrid
            // getRowId={(r)=>r._id}
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
          />
          <div>
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip>Add new lesson</Tooltip>}
            >
              <Link to={"/newlesson"}>
                <Button className="btn-floating" style={{ "z-index": -1 }}>
                  <img src={addIcon} alt="add-post" width="60" height="60" />
                </Button>
              </Link>
            </OverlayTrigger>
          </div>
        </div>
      </>
    );
  }
  return <>{body}</>;
}
