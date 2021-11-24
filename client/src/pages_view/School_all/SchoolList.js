/** @format */

import "../Student_all/userList.css";
import "../Css/elementList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { schools, students } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SchoolContext } from "../../contexts/SchoolContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
// import Spinner from 'react-bootstrap/Spinner'
import addIcon from "../../assets/plus-circle-fill.svg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ActionButtons from "./ActionButtons";

export default function SchoolList() {
  // Contexts
  // const {
  // 	authState: {
  // 		user: { username }
  // 	}
  // } = useContext(AuthContext)

  // const {
  // 	studentState: { student, students, studentsLoading },
  // 	getStudents,
  // 	setShowAddStudentTable,
  // 	showToast: { show, message, type },
  // 	setShowToast
  // } = useContext(StudentContext)

  // useEffect(() => getStudents(), [])

  const [data, setData] = useState(schools);

  const [single, setSingle] = useState(schools);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const handleChoose = (id) => {
    console.log("test sucessfull");
    setSingle(single.filter((item) => item.id === id));
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
  if (schools.length === 0) {
    // if (1===1)
    body = (
      <>
        <div className="elementList">
          <h2 className="header">
            There is no school available, please create it to start your first
            logbook
          </h2>
          <Link to={"/newschool"}>
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
              overlay={<Tooltip>Add new school</Tooltip>}
            >
              <Link to={"/newschool"}>
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
