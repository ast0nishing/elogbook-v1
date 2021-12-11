/** @format */

import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LogbookContext } from "../../contexts/LogbookContext";
import { useContext, useEffect } from "react";
// import Spinner from 'react-bootstrap/Spinner'
import addIcon from "../../assets/plus-circle-fill.svg";
import Button from "react-bootstrap/Button";
// import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
// import Col from 'react-bootstrap/Col'
import ActionButtons from "./ActionButtons";

export default function Logbook() {
  // Contexts
  // const {
  //   authState: {
  //     user: { username },
  //   },
  // } = useContext(AuthContext);

  const {
    logbookState: { logbook, logbooks, logbooksLoading },
    getLogbooks,

    setShowAddLogbookTable,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(LogbookContext);

  useEffect(() => getLogbooks(), []);

  const [data, setData] = useState(logbooks);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "class", headerName: "Class" },
    { field: "fromweek", headerName: "Fromweek", width: 200 },
    { field: "toweek", headerName: "Toweek", width: 200 },
    { field: "subjects", headerName: "Subjects", width: 200 },
    { field: "course", headerName: "Course", width: 200 },
    { field: "teacher", headerName: "Teacher", width: 200 },
    { field: "block", headerName: "Block", width: 200 },
    { field: "weekDay", headerName: "WeekDay", width: 200 },
    { field: "time", headerName: "Time", width: 200 },
    { field: "comment", headerName: "Comement", width: 200 },
    { field: "grade", headerName: "Grade", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <ActionButtons _id={params.row._id} />
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className="userList">
        <DataGrid
          getRowId={(r) => r._id}
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
        <div>
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip>Add new logbook</Tooltip>}
          >
            <Link to={"/newuser"}>
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
