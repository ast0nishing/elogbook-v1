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
import { TeacherContext } from "../../contexts/TeacherContext";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
export default function TeacherList() {
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    teacherState: { teacher, teachers, teachersLoading },
    getTeachers,
    showToast: { show, message, type },
    setShowToast,
    deleteTeacher,
    findTeacher,
  } = useContext(TeacherContext);

  useEffect(() => getTeachers(), []);
  // Get all course
  const [data, setData] = useState(teachers);
  const history = useHistory();
  // Select course for editing
  const handleChoose = (username) => {
    findTeacher(username);
    history.push("/teacherdetail");
  };
  const handleDelete = async (username) => {
    try {
      setData(data.filter((item) => item.username !== username));
      const { message } = await deleteTeacher(username);
      if (message) {
        console.log(message);
        setShowToast({ show: true, message, type: null });
        toast(message);
      }
    } catch (error) {}
  };
  const columns = [
    { field: "idSchool", headerName: "School id", width: 200 },
    { field: "username", headerName: "User name", width: 200 },
    { field: "password", headerName: "Password", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "major", headerName: "Major", width: 200 },
    { field: "phoneNumber", headerName: "Phone", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
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
  let body = null;
  if (teachers.length === 0) {
    body = (
      <>
        <div className="elementList">
          <h2 className="header">
            There is no teacher available in your school, please create it to
            start your first logbook
          </h2>
          <Link to={"/newteacher"}>
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
            getRowId={(r) => r.username}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
          />
        </div>
        <div>
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip>Add new teacher</Tooltip>}
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
  return <>{body}</>;
}
