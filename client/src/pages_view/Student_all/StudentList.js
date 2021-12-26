/** @format */
import "../Css/elementList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { StudentContext } from "../../contexts/StudentContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
// import Spinner from 'react-bootstrap/Spinner'
import addIcon from "../../assets/plus-circle-fill.svg";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
export default function StudentList() {
  // Contexts
  const {
    studentState: { student, students, studentsLoading },
    getStudents,
    showToast: { show, message, type },
    findStudent,
    deleteStudent,
    setShowToast,
  } = useContext(StudentContext);
  // Get all course
  useEffect(() => getStudents({ year: 2019, name: "9A2" }), []);
  const [data, setData] = useState(students);
  const history = useHistory();

  const [data1, setData1] = useState({ name: "9A2", year: "2019" });
  const { name, year } = data1;

  const onChangeSelectForm = (event) =>
    setData1({ ...data1, [event.target.name]: event.target.value });
  // Select course for editing
  const handleChoose = (studentId) => {
    findStudent(studentId);
    history.push("/student-detail");
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    getStudents(data1);
    setData(students);
  };
  const handleDelete = async (studentId) => {
    try {
      const { message } = await deleteStudent(studentId);
      if (message == "Delete successfull") {
        setShowToast({ show: true, message, type: null });
        toast(message);
        setData(data.filter((item) => item.studentId !== studentId));
      }
    } catch (error) {}
  };

  const columns = [
    { field: "username", headerName: "Username", width: 200 },
    { field: "password", headerName: "Password", width: 200 },
    { field: "name", headerName: "Student name", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "phoneNumber", headerName: "Phone", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "studentId", headerName: "Student ID", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              className="elementListEdit"
              onClick={() => handleChoose(params.row.studentId)}
            >
              Edit
            </button>
            <DeleteOutline
              className="ListDelete"
              onClick={() => handleDelete(params.row.studentId)}
            />
          </>
        );
      },
    },
  ];
  let body = null;
  if (students.length === 0) {
    body = (
      <>
        <div className="elementList">
          <h2 className="header">
            There is no student available, please create it to start your first
            logbook
          </h2>
          <Link to={"/newstudent"}>
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
            <input type="submit" value="Submit"></input>
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
          <div className="elementList">
            <DataGrid
              getRowId={(r) => r.studentId}
              rows={data}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              checkboxSelection
              style={{ height: 500 }}
            />
            <div>
              <OverlayTrigger
                placement="left"
                overlay={<Tooltip>Add new student</Tooltip>}
              >
                <Link to={"/newstudent"}>
                  <Button className="btn-floating" style={{ "z-index": -1 }}>
                    <img src={addIcon} alt="add-post" width="60" height="60" />
                  </Button>
                </Link>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <>{body}</>;
}
