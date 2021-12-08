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
import Form from "react-bootstrap/Form";
export default function TeacherList() {
  //  Teacher context
  const {
    teacherState: { teacher, teachers, teachersLoading },
    getTeachers,
    showToast: { show, message, type },
    setShowToast,
    deleteTeacher,
    findTeacher,
    getClassTeachers,
  } = useContext(TeacherContext);

  // Get teachers
  const [data, setData] = useState(teachers);
  const history = useHistory();
  // Get teachers by class
  const [data1, setData1] = useState({ name: "9A9", year: "2019" });
  const { name, year } = data1;

  const onChangeSelectForm = (event) =>
    setData1({ ...data1, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    getClassTeachers(data1);
  };

  // Editing teacher
  const handleChoose = (teacherId) => {
    findTeacher(teacherId);
    history.push("/teacherdetail");
  };
  // Deleting teacher
  const handleDelete = async (teacherId) => {
    setData(data.filter((item) => item.teacherId !== teacherId));
    const { message } = await deleteTeacher(teacherId);
    if (message) {
      setShowToast({ show: true, message, type: null });
      toast(message);
    }
  };

  const columns = [
    // { field: "idSchool", headerName: "School id", width: 200 },
    // { field: "username", headerName: "User name", width: 200 },
    // { field: "password", headerName: "Password", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    // { field: "major", headerName: "Major", width: 200 },
    // { field: "phoneNumber", headerName: "Phone", width: 200 },
    // { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              className="elementListEdit"
              onClick={() => handleChoose(params.row.teacherId)}
            >
              Edit
            </button>
            <DeleteOutline
              className="ListDelete"
              onClick={() => handleDelete(params.row.teacherId)}
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
        <div>
          <h2>Select Teachers</h2>
          <Form
            onSubmit={onSubmit}
            className="my-4"
            style={{
              display: "flex",
              "flex-flow": "row wrap",
              "align-items": "center",
            }}
          >
            <Form.Control
              as="select"
              defaultValue="9A9"
              name="name"
              value={name}
              onChange={onChangeSelectForm}
              style={{ width: 200 }}
            >
              <option value="9A9">9A9</option>
              <option value="9A2">9A2</option>
              <option value="9A3">9A3</option>
            </Form.Control>
            <Form.Control
              as="select"
              defaultValue="2019"
              name="year"
              value={year}
              onChange={onChangeSelectForm}
              style={{ width: 200 }}
            >
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
            </Form.Control>
            <br></br>
            <input
              type="submit"
              value="Submit"
              onClick={console.log("DMM")}
            ></input>
          </Form>
        </div>
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
            getRowId={(r) => r.teacherId}
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
            overlay={<Tooltip>Add new teacher</Tooltip>}
          >
            <Link to={"/newteacher"}>
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
