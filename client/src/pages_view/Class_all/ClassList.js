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
import { ClassContext } from "../../contexts/ClassContext";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
export default function ClassList() {
  // Contexts
  const {
    classState: { class_, classes, classesLoading },
    getClasses,
    showToast: { show, message, type },
    setShowToast,
    deleteClass,
    findClass,
  } = useContext(ClassContext);

  useEffect(() => getClasses(), []);

  // Get all course
  const [data, setData] = useState(classes);
  const history = useHistory();
  // Select course for editing
  const handleChoose = (classId) => {
    findClass(classId);
    history.push("/classdetail");
  };
  const handleDelete = async (classId) => {
    try {
      setData(data.filter((item) => item.idClass !== classId));
      const { message } = await deleteClass(classId);
      if (message) {
        console.log(message);
        setShowToast({ show: true, message, type: null });
        toast(message);
      }
    } catch (error) {}
  };
  const columns = [
    { field: "idClass", headerName: "Class ID", width: 200 },
    {
      field: "name",
      headerName: "Class name",
      width: 200,
    },
    {
      field: "academicYearId",
      headerName: "Academic Year",
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
              onClick={() => handleChoose(params.row.idClass)}
            >
              Edit
            </button>
            <DeleteOutline
              className="ListDelete"
              onClick={() => handleDelete(params.row.idClass)}
            />
          </>
        );
      },
    },
  ];

  let body = null;
  if (classesLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (classes.length === 0) {
    body = (
      <>
        <div className="elementList">
          <h2 className="header">
            There is no class available, please create your classes first
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
            getRowId={(r) => r.classId}
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
            overlay={<Tooltip>Add new class</Tooltip>}
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
