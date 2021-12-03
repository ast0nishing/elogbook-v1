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
export default function StudentList() {
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    studentState: { student, students, studentsLoading },
    getStudents,
    showToast: { show, message, type },
    findStudent,
    deleteStudent,
    setShowToast,
  } = useContext(StudentContext);

  useEffect(() => getStudents(), []);

  // Get all course
  const [data, setData] = useState(students);
  const history = useHistory();
  // Select course for editing
  const handleChoose = (studentId) => {
    findStudent(studentId);
    history.push("/studentdetail");
  };
  const handleDelete = async (username) => {
    try {
      setData(data.filter((item) => item.username !== username));
      const { message } = await deleteStudent(username);
      if (message) {
        console.log(message);
        setShowToast({ show: true, message, type: null });
        toast(message);
      }
    } catch (error) {}
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "username", headerName: "Username", width: 200 },
    { field: "name", headerName: "School name", width: 200 },
    { field: "province", headerName: "Province", width: 200 },
    { field: "district", headerName: "District", width: 200 },
    { field: "town", headerName: "Town", width: 200 },
    { field: "street", headerName: "Street", width: 200 },
    { field: "streetNo", headerName: "Street Number", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          // <>
          //   <ActionButtons id={params.row.id}/>
          // </>
          <>
            <Link to={"/school/" + params.row.id}>
              {/* <Link to="/schools/"> */}
              <button
                className="ListEdit"
                onClick={() => handleChoose(params.row.id)}
              >
                Edit
              </button>
            </Link>
            <DeleteOutline
              className="ListDelete"
              onClick={() => handleDelete(params.row.id)}
              // onClick={()=>handleChoose(params.row.id)}
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
        {" "}
        <div className="elementList">
          <DataGrid
            getRowId={(r) => r.id}
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
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
      </>
    );
  }
  return <>{body}</>;
}
