/** @format */

import "../Css/elementList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import addIcon from "../../assets/plus-circle-fill.svg";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";

import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { TimetableContext } from "../../contexts/TimetableContext";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
export default function TimetableList() {
  // Contexts
  const {
    timetableState: { timetable, timetables, timetablesLoading },
    getTimetables,
    showToast: { show, message, type },
    setShowToast,
    deleteTimetable,
    findTimetable,
  } = useContext(TimetableContext);

  useEffect(() => getTimetables(), []);

  // Get all course
  const [data, setData] = useState(timetables);
  const history = useHistory();
  // Select course for editing
  const handleChoose = (courseId) => {
    findTimetable(courseId);
    history.push("/timetable-detail");
  };
  const handleDelete = async (timetableId) => {
    try {
      setData(data.filter((item) => item.timetableId !== timetableId));
      const { message } = await deleteTimetable(timetableId);
      if (message) {
        console.log(message);
        setShowToast({ show: true, message, type: null });
        toast(message);
      }
    } catch (error) {}
  };
  const columns = [
    { field: "fromWeek", headerName: "From week", width: 200 },
    { field: "toWeek", headerName: "To week", width: 200 },
    { field: "time", headerName: "Time", width: 200 },
    { field: "courseCode", headerName: "Course Code", width: 200 },
    { field: "day", headerName: "Day", width: 200 },
    { field: "className", headerName: "Class", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              className="elementListEdit"
              onClick={() => handleChoose(params.row.id)}
            >
              Edit
            </button>
            <DeleteOutline
              className="ListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  let body = null;
  if (timetablesLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (timetables.length === 0) {
    body = (
      <>
        <div className="elementList">
          <h2 className="header">
            There is no timetable available, please create your timetable first
          </h2>
          <Link to={"/new-timetable"}>
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
        {/* <div className="elementList"> */}
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
            rows={data}
            // getRowId={(r) => r.code}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            style={{ height: 500 }}
          />
        </div>
        <div>
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip>Add new course</Tooltip>}
          >
            <Link to={"/new-timetable"}>
              <Button className="btn-floating" style={{ "z-index": -1 }}>
                <img src={addIcon} alt="add-post" width="60" height="60" />
              </Button>
            </Link>
          </OverlayTrigger>
        </div>
      </>
    );
  }
  return <>{body}</>;
}
